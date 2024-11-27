import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Asistencia, Asignatura } from '../models/models';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {
  asignaturas: Asignatura[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    const estudianteId = Number(localStorage.getItem('estudianteId')); // Obtener el ID del estudiante
    if (estudianteId) {
      // Obtener las asignaturas
      this.apiService.getAsignaturas().subscribe({
        next: (asignaturas) => {
          // Obtener todas las asistencias para el estudiante
          this.apiService.getAsistenciasPorEstudiante(estudianteId).subscribe({
            next: (asistencias) => {
              // Asegurarse de que las asignaturas no se dupliquen
              this.asignaturas = asignaturas.filter(asignatura => {
                // Verificar si la asignatura tiene asistencias para este estudiante
                asignatura.asistencias = asistencias.filter(asistencia => 
                  asistencia.asignaturaId === asignatura.id && asistencia.estudiante_id === estudianteId
                );
                // Devolver solo las asignaturas que tienen asistencias para este estudiante
                return asignatura.asistencias.length > 0;
              });
            },
            error: (error) => console.error('Error al cargar asistencias', error)
          });
        },
        error: (error) => console.error('Error al cargar asignaturas', error)
      });
    } else {
      console.error('No se encontró el ID de estudiante en localStorage');
    }
  }
}
