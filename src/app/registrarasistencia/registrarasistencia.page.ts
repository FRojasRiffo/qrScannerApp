import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Asistencia } from '../models/models';

@Component({
  selector: 'app-registrarasistencia',
  templateUrl: './registrarasistencia.page.html',
  styleUrls: ['./registrarasistencia.page.scss'],
})
export class RegistrarAsistenciaPage implements OnInit {
  asistencias: Asistencia[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.obtenerAsistencias();
  }

  obtenerAsistencias() {
    this.apiService.getAsistencias().subscribe((data) => {
      this.asistencias = data;
    }, error => {
      console.error('Error al obtener asistencias:', error);
    });
  }
}
