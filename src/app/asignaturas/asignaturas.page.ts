import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Asignatura } from '../models/models';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {
  asignaturas: Asignatura[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // Obtener el estudiante_id desde el localStorage
    const estudianteId = localStorage.getItem('estudianteId');
    
    if (estudianteId) {
      this.apiService.getAsignaturas().subscribe({
        next: (data) => {
          // Filtrar las asignaturas que están asociadas al estudiante_id
          this.asignaturas = data.filter(asignatura => 
            asignatura.estudiante_id === parseInt(estudianteId)  // Filtrar por el estudiante_id
          );
        },
        error: (error) => console.error('Error al cargar asignaturas', error)
      });
    }
  }
}
