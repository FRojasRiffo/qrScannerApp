import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Usuario, Asignatura, Asistencia } from '../models/models';
import { HttpErrorResponse } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importar el módulo de pruebas HTTP
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verificar que no haya solicitudes HTTP pendientes
  });

  // Prueba: Obtener todos los usuarios
  it('debería devolver un array de usuarios', () => {
    const dummyUsuarios: Usuario[] = [
      { id: 1, nombre: 'Juan Pérez', correo: 'usuario1@example.com', contraseña: '1234', tipo: 'docente' },
      { id: 2, nombre: 'Ana Gómez', correo: 'usuario2@example.com', contraseña: '5678', tipo: 'estudiante' },
    ];

    service.getUsuarios().subscribe((usuarios) => {
      expect(usuarios.length).toBe(2);
      expect(usuarios).toEqual(dummyUsuarios);
    });

    // Mocking HTTP request
    const req = httpMock.expectOne('http://192.168.1.83:3000/usuarios');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsuarios); // Devolver los datos mockeados
  });

  // Prueba: Obtener todas las asignaturas
  it('debería devolver un array de asignaturas', () => {
    const dummyAsignaturas: Asignatura[] = [
      { id: 1, nombre: 'Matemáticas', sigla: 'MAT101', seccion: 'A', docente_id: 1, estudiante_id: 2 },
      { id: 2, nombre: 'Ciencias', sigla: 'CIE102', seccion: 'B', docente_id: 2, estudiante_id: 3 },
    ];

    service.getAsignaturas().subscribe((asignaturas) => {
      expect(asignaturas.length).toBe(2);
      expect(asignaturas).toEqual(dummyAsignaturas);
    });

    // Mocking HTTP request
    const req = httpMock.expectOne('http://192.168.1.83:3000/asignaturas');
    expect(req.request.method).toBe('GET');
    req.flush(dummyAsignaturas); // Devolver los datos mockeados
  });

  // Prueba: Obtener asistencias por asignatura
  it('debería devolver una asignatura específica', () => {
    const asignaturaId = 1;
    const dummyAsignatura: Asignatura = {
      id: asignaturaId, 
      nombre: 'Matemáticas', 
      sigla: 'MAT101', 
      seccion: 'A', 
      docente_id: 1, 
      estudiante_id: 2
    };

    service.getAsistenciasPorAsignatura(asignaturaId).subscribe((asignatura) => {
      expect(asignatura).toEqual(dummyAsignatura);
    });

    // Mocking HTTP request
    const req = httpMock.expectOne(`http://192.168.1.83:3000/asignaturas/${asignaturaId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyAsignatura); // Devolver los datos mockeados
  });

  // Prueba: Obtener asistencias por estudiante
  it('debería devolver un array de asistencias', () => {
    const estudianteId = 1;
    const dummyAsistencias: Asistencia[] = [
      { id: '1', estudiante_id: estudianteId, asignaturaId: 1, fecha: '2024-11-26', estado: 'Presente' },
      { id: '2', estudiante_id: estudianteId, asignaturaId: 2, fecha: '2024-11-26', estado: 'Falta' },
    ];

    service.getAsistenciasPorEstudiante(estudianteId).subscribe((asistencias) => {
      expect(asistencias.length).toBe(2);
      expect(asistencias).toEqual(dummyAsistencias);
    });

    // Mocking HTTP request
    const req = httpMock.expectOne(`http://192.168.1.83:3000/asistencias?estudiante_id=${estudianteId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyAsistencias); // Devolver los datos mockeados
  });

  // Prueba: Registrar una nueva asistencia
  it('debería registrar una asistencia correctamente', () => {
    const asignaturaId = '1';
    const estudianteId = 1;
    const fechaHora = '2024-11-26T10:00:00';

    const response = { message: 'Asistencia registrada con éxito' };

    service.registrarAsistencia(asignaturaId, estudianteId, fechaHora).subscribe((res) => {
      expect(res.message).toBe('Asistencia registrada con éxito');
    });

    // Mocking HTTP request
    const req = httpMock.expectOne('http://192.168.1.83:3000/asistencias');
    expect(req.request.method).toBe('POST');
    req.flush(response); // Devolver la respuesta mockeada
  });

  // Prueba: Actualizar un usuario
  it('debería actualizar un usuario correctamente', () => {
    const usuarioId = 1;
    const dummyUsuario: Usuario = { 
      id: usuarioId, 
      nombre: 'Juan Pérez', 
      correo: 'usuario1@example.com', 
      contraseña: 'newpassword', 
      tipo: 'estudiante' 
    };

    service.updateUsuario(usuarioId, dummyUsuario).subscribe((usuario) => {
      expect(usuario).toEqual(dummyUsuario);
    });

    // Mocking HTTP request
    const req = httpMock.expectOne(`http://192.168.1.83:3000/usuarios/${usuarioId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyUsuario); // Devolver los datos mockeados
  });

  // Prueba: Manejar error en obtener usuarios
  it('debería manejar el error correctamente al obtener usuarios', () => {
    service.getUsuarios().subscribe((usuarios) => {
      expect(usuarios.length).toBe(0);
    });

    // Mocking HTTP request with error
    const req = httpMock.expectOne('http://192.168.1.83:3000/usuarios');
    expect(req.request.method).toBe('GET');
    req.flush('Error', { status: 500, statusText: 'Server Error' }); // Simular un error 500
  });
});
