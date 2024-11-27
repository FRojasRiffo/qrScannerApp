// asignaturas-docente.page.ts

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Asignatura } from '../models/models';

@Component({
  selector: 'app-asignaturas-docente',
  templateUrl: './asignaturas-docente.page.html',
  styleUrls: ['./asignaturas-docente.page.scss'],
})
export class AsignaturasDocentePage implements OnInit {
  asignaturasDocente: Asignatura[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    const usuarioId = localStorage.getItem('usuarioId');

    if (usuarioId) {
      this.apiService.getAsignaturas().subscribe({
        next: (asignaturas) => {
          // Filtrar asignaturas donde el docente_id coincide con el usuarioId
          this.asignaturasDocente = asignaturas.filter(
            asignatura => asignatura.docente_id === Number(usuarioId)
          );
        },
        error: (error) => {
          console.error('Error al obtener las asignaturas', error);
        }
      });
    }
  }
}
