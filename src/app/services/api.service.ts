import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'; 
import { catchError } from 'rxjs/operators';  // Corrected import for catchError
import { Usuario, Asignatura, Asistencia } from '../models/models';  // Ensure correct paths to your models

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://192.168.1.83:3000';  // Base API URL

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`).pipe(
      catchError(this.handleError<Usuario[]>('getUsuarios', []))  // Handles errors and returns empty array as fallback
    );
  }

  // Obtener todas las asignaturas
  getAsignaturas(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.apiUrl}/asignaturas`).pipe(
      catchError(this.handleError<Asignatura[]>('getAsignaturas', []))  // Handles errors and returns empty array as fallback
    );
  }

  // Obtener asistencias por asignatura
  getAsistenciasPorAsignatura(asignaturaId: number): Observable<Asignatura> {
    return this.http.get<Asignatura>(`${this.apiUrl}/asignaturas/${asignaturaId}`).pipe(
      catchError(this.handleError<Asignatura>('getAsistenciasPorAsignatura'))
    );
  }

  // Obtener asistencias por estudiante
  getAsistenciasPorEstudiante(estudianteId: number): Observable<Asistencia[]> {
    const url = `${this.apiUrl}/asistencias?estudiante_id=${estudianteId}`;
    return this.http.get<Asistencia[]>(url).pipe(
      catchError(this.handleError<Asistencia[]>('getAsistenciasPorEstudiante', []))
    );
  }

  // Obtener todas las asistencias
  getAsistencias(): Observable<Asistencia[]> {
    return this.http.get<Asistencia[]>(`${this.apiUrl}/asistencias`).pipe(
      catchError(this.handleError<Asistencia[]>('getAsistencias', []))
    );
  }

  // Registrar una nueva asistencia
  registrarAsistencia(asignaturaId: string, estudianteId: number, fechaHora: string): Observable<any> {
    const url = `${this.apiUrl}/asistencias`;
    const asistencia = {
      asignaturaId,
      estudiante_id: estudianteId,
      fecha: fechaHora,
      estado: 'Presente',  // Default status as "Presente"
    };

    return this.http.post(url, asistencia).pipe(
      catchError(this.handleError('registrarAsistencia'))
    );
  }

  // Actualizar usuario
  updateUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/usuarios/${id}`, usuario).pipe(
      catchError(this.handleError<Usuario>('updateUsuario'))
    );
  }

  // Manejar errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);  // Log the error message to the console
      return of(result as T);  // Return the result passed into the function (defaults to the provided 'result' or undefined)
    };
  }
}
