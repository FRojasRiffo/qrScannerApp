import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Usuario } from '../models/models';

@Component({
  selector: 'app-cambiarclave',
  templateUrl: './cambiarclave.page.html',
  styleUrls: ['./cambiarclave.page.scss'],
})
export class CambiarClavePage implements OnInit {
  claveIngresada: string = ''; // Clave actual ingresada por el usuario
  nuevaClave: string = '';
  confirmarClave: string = '';
  usuarioActual: Usuario | null = null;
  mensaje: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarUsuarioActual();
  }

  cargarUsuarioActual() {
    const usuarioId = Number(localStorage.getItem('usuarioId'));
    this.apiService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarioActual = usuarios.find(user => Number(user.id) === usuarioId) || null;
        console.log('Usuario actual:', this.usuarioActual);
      },
      error: (error) => console.error('Error al cargar usuario', error)
    });
  }

  cambiarClave() {
    if (this.usuarioActual && this.validarCambioClave()) {
      this.usuarioActual.contraseña = this.nuevaClave;

      this.apiService.updateUsuario(this.usuarioActual.id, this.usuarioActual).subscribe({
        next: () => this.mostrarMensaje('Clave cambiada correctamente'),
        error: (error) => {
          this.mostrarMensaje('Error al cambiar la clave');
          console.error('Error al cambiar clave', error);
        }
      });
    } else {
      this.mostrarMensaje('La validación de la clave ha fallado');
    }
  }

  validarCambioClave(): boolean {
    return (
      this.nuevaClave === this.confirmarClave &&
      this.claveIngresada === this.usuarioActual?.contraseña
    );
  }

  mostrarMensaje(mensaje: string) {
    this.mensaje = mensaje;
    this.claveIngresada = '';
    this.nuevaClave = '';
    this.confirmarClave = '';
  }
}
