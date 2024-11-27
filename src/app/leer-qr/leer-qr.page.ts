import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-leer-qr',
  templateUrl: './leer-qr.page.html',
  styleUrls: ['./leer-qr.page.scss'],
})
export class LeerQrPage implements OnInit {
  qrData: string | null = null;
  isScanning: boolean = false;
  estudianteId: number;
  asistenciaData: { asignaturaId: string; fechaHora: string; estudianteId: number } | null = null;
  errorMessage: string | null = null;

  constructor(private apiService: ApiService, private alertController: AlertController) {
    this.estudianteId = this.getEstudianteId();
  }

  ngOnInit() {}

  private getEstudianteId(): number {
    const id = localStorage.getItem('estudianteId');
    return id ? parseInt(id) : 0;
  }

  async scanQRCode() {
    const permission = await this.checkCameraPermission();
    if (!permission) return;

    this.isScanning = true;
    BarcodeScanner.hideBackground();

    try {
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        this.qrData = result.content;
        const asignaturaId = this.extractAsignaturaId(this.qrData);

        if (asignaturaId) {
          const fechaHoraLocal = new Date().toLocaleString();
          this.asistenciaData = {
            asignaturaId,
            fechaHora: fechaHoraLocal,
            estudianteId: this.estudianteId,
          };

          await this.validarYRegistrarAsistencia(asignaturaId, this.estudianteId, fechaHoraLocal);
        } else {
          console.warn('No se pudo extraer el ID de la asignatura del contenido QR.');
        }
      }
    } catch (error) {
      console.error('Error durante el escaneo', error);
    } finally {
      this.isScanning = false;
      BarcodeScanner.showBackground();
      await BarcodeScanner.stopScan();
    }
  }

  /**
   * Check camera permissions before starting the QR scanning process.
   */
  private async checkCameraPermission(): Promise<boolean> {
    const permission = await BarcodeScanner.checkPermission({ force: true });
    console.log('Camera permission status:', permission);

    if (!permission.granted) {
      if (permission.denied) {
        // User has explicitly denied the permission
        alert('Camera access is required. Please enable it in settings.');
        BarcodeScanner.openAppSettings(); // Redirect to app settings
      } else {
        // Permission not granted for other reasons
        alert('Camera permission not granted.');
      }
      return false;
    }

    alert('Camera permission granted.');
    return true;
  }

  private extractAsignaturaId(qrContent: string): string | null {
    const match = qrContent.match(/^asignatura:(\d+)$/);
    return match ? match[1] : null;
  }

  private async validarYRegistrarAsistencia(asignaturaId: string, estudianteId: number, fechaHora: string) {
    try {
      this.errorMessage = null; // Clear previous error message

      const asignaturasEstudiante = await this.apiService.getAsignaturas().toPromise();

      if (asignaturasEstudiante) {
        const asignatura = asignaturasEstudiante.find((a) => a.id.toString() === asignaturaId);

        if (asignatura) {
          if (asignatura.estudiante_id !== this.estudianteId) {
            this.errorMessage = 'Este código QR no corresponde a tu asignatura o estudiante.';
            return;
          }

          const asistenciasEstudiante = await this.apiService.getAsistenciasPorEstudiante(estudianteId).toPromise();
          const fechaActual = new Date(fechaHora).toISOString().split('T')[0];

          if (asistenciasEstudiante?.find((asistencia) =>
            asistencia.asignaturaId.toString() === asignaturaId &&
            new Date(asistencia.fecha).toISOString().split('T')[0] === fechaActual
          )) {
            this.errorMessage = 'Ya has registrado tu asistencia hoy para esta asignatura.';
          } else {
            await this.apiService.registrarAsistencia(asignaturaId, estudianteId, fechaHora).toPromise();
            this.showAlert('Asistencia Registrada', 'La asistencia se registró exitosamente.');
          }
        } else {
          this.errorMessage = 'Asignatura no encontrada.';
        }
      } else {
        this.errorMessage = 'No se encontraron asignaturas.';
      }
    } catch (error) {
      console.error('Error al registrar asistencia:', error);
      this.errorMessage = 'Hubo un problema al registrar la asistencia. Inténtalo de nuevo.';
    }
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
