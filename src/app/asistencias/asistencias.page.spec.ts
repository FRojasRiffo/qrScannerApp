import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistenciasPage } from './asistencias.page';
import { ApiService } from '../services/api.service';
import { of, throwError } from 'rxjs';
import { Asignatura, Asistencia } from '../models/models';

describe('AsistenciasPage', () => {
  let component: AsistenciasPage;
  let fixture: ComponentFixture<AsistenciasPage>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    // Mock para ApiService
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getAsignaturas', 'getAsistenciasPorEstudiante']);

    await TestBed.configureTestingModule({
      declarations: [ AsistenciasPage ],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AsistenciasPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });


  it('debería manejar caso donde no hay estudianteId en localStorage', () => {
    spyOn(console, 'error');  // Espiamos los errores de consola

    // Limpiamos el localStorage para simular que no hay `estudianteId`
    localStorage.removeItem('estudianteId');

    component.ngOnInit();

    fixture.detectChanges();  // Detectamos los cambios

    expect(console.error).toHaveBeenCalledWith('No se encontró el ID de estudiante en localStorage');
  });

  

});
