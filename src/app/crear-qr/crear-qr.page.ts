import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Asignatura } from '../models/models';

@Component({
  selector: 'app-crear-qr',
  templateUrl: './crear-qr.page.html',
  styleUrls: ['./crear-qr.page.scss'],
})
export class CrearQrPage implements OnInit {
  asignaturas: Asignatura[] = [];
  codigoQr: string | null = null;
  asignaturaSeleccionada: Asignatura | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    const docenteId = Number(localStorage.getItem('docenteId')); // Obtiene el id del docente autenticado
    
    this.apiService.getAsignaturas().subscribe({
      next: (data) => {
        // Filtra asignaturas por docente_id
        this.asignaturas = data.filter(asignatura => asignatura.docente_id === docenteId);
      },
      error: (err) => console.error('Error al obtener asignaturas:', err)
    });
  }

  generarQr(asignatura: Asignatura) {
    this.codigoQr = `asignatura:${asignatura.id}`;
    this.asignaturaSeleccionada = asignatura;
  }
}
