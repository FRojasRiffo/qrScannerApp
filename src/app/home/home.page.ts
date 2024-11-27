import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  nombreUsuario: string = '';
  tipoUsuario: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  

  ngOnInit() {
    const usuarioId = localStorage.getItem('usuarioId');

    if (usuarioId) {
      this.apiService.getUsuarios().subscribe({
        next: (usuarios) => {
          const usuario = usuarios.find(user => user.id.toString() === usuarioId);
          if (usuario) {
            console.log('Datos de usuario:', usuario); // Verifica el contenido del usuario
            this.nombreUsuario = usuario.correo;
            this.tipoUsuario = usuario.tipo || ''; // Asegura que tipoUsuario sea una cadena
            if (!this.tipoUsuario) {
              console.error('El campo tipo no está definido para el usuario.');
            }
          } else {
            console.error('Usuario no encontrado');
          }
        },
        error: (error) => {
          console.error('Error al cargar usuario', error);
        }
      });
    } else {
      console.error('ID de usuario no válido');
    }
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioId');
    this.router.navigate(['/login']);
  }
}
