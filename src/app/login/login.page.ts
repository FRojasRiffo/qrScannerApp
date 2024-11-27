import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  public alertButtons = [
    {
      text: 'Restablecer contraseña',
      handler: (data: any) => {
        if (data && data.nombreUsuario) {
          this.enviarMensaje(data.nombreUsuario);
        }
      },
    },
  ];

  public alertInputs = [
    {
      name: 'nombreUsuario',
      type: 'text',
      placeholder: 'Nombre de usuario',
    },
  ];

  nombreUsuario: string = '';
  contrasena: string = '';
  apiUrl: string = localStorage.getItem('apiUrl') || 'http://192.168.1.83:3000'; // Recuperar URL guardada

  constructor(
    private alertController: AlertController,
    private router: Router,
    private http: HttpClient
  ) {}

  saveApiUrl() {
    localStorage.setItem('apiUrl', this.apiUrl);
    this.mostrarAlerta('Éxito', `URL de la API guardada: ${this.apiUrl}`);
  }

  async onSubmit() {
    if (!this.nombreUsuario || !this.contrasena) {
      await this.mostrarAlerta('Error', 'Por favor, complete todos los campos.');
      return;
    }

    this.http.get<any>(`${this.apiUrl}/usuarios`).subscribe({
      next: async (response) => {
        if (Array.isArray(response)) {
          const usuario = response.find(
            (u: { correo: string; contraseña: string; tipo: string }) =>
              u.correo === this.nombreUsuario && u.contraseña === this.contrasena
          );

          if (usuario) {
            localStorage.setItem('usuarioId', usuario.id.toString());

            if (usuario.tipo === 'docente') {
              localStorage.setItem('docenteId', usuario.id.toString());
            } else if (usuario.tipo === 'estudiante') {
              localStorage.setItem('estudianteId', usuario.id.toString());
            }

            await this.mostrarAlerta('Inicio de Sesión Exitoso', '', '/home');
          } else {
            await this.mostrarAlerta(
              'Error',
              'Credenciales no válidas. Por favor, inténtalo de nuevo.'
            );
          }
        } else {
          console.error('La respuesta no es un array');
          await this.mostrarAlerta('Error', 'La respuesta de la API no es válida.');
        }
      },
      error: async (err) => {
        console.error('Error en la solicitud:', err);
        await this.mostrarAlerta(
          'Error',
          'Hubo un problema al verificar las credenciales. Intenta nuevamente más tarde.'
        );
      },
    });
  }

  async mostrarAlerta(header: string, message: string, route?: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            if (route) {
              this.router.navigate([route]);
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async enviarMensaje(nombreUsuario: string) {
    const mensaje = `Se ha enviado un correo para restablecer la contraseña del usuario ${nombreUsuario}.`;
    await this.mostrarAlerta('Correo enviado', mensaje);
  }
}
