import { TestBed } from '@angular/core/testing';
import { CrearQrPage } from './crear-qr.page';
import { ApiService } from '../services/api.service';
import { of, throwError } from 'rxjs';

describe('CrearQrPage', () => {
  let component: CrearQrPage;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const apiServiceMock = jasmine.createSpyObj('ApiService', ['getAsignaturas']);

    TestBed.configureTestingModule({
      providers: [
        CrearQrPage,
        { provide: ApiService, useValue: apiServiceMock },
      ],
    });

    component = TestBed.inject(CrearQrPage);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  describe('ngOnInit', () => {
    it('debería cargar las asignaturas filtradas por docente', () => {
      // Simula un docenteId almacenado
      const docenteId = 1;
      spyOn(localStorage, 'getItem').and.returnValue(docenteId.toString());

      // Simula una respuesta exitosa de la API con asignaturas completas
      const asignaturasMock = [
        {
          id: 1,
          nombre: 'Matemáticas',
          sigla: 'MAT101',
          seccion: 'A',
          docente_id: 1,
          estudiante_id: 101
        },
        {
          id: 2,
          nombre: 'Historia',
          sigla: 'HIS201',
          seccion: 'B',
          docente_id: 2,
          estudiante_id: 102
        },
      ];
      apiServiceSpy.getAsignaturas.and.returnValue(of(asignaturasMock));

      // Ejecuta el método
      component.ngOnInit();

      // Verifica que las asignaturas se hayan filtrado correctamente
      expect(apiServiceSpy.getAsignaturas).toHaveBeenCalled();
      expect(component.asignaturas).toEqual([
        {
          id: 1,
          nombre: 'Matemáticas',
          sigla: 'MAT101',
          seccion: 'A',
          docente_id: 1,
          estudiante_id: 101
        }
      ]);
    });

    it('debería manejar un error al obtener las asignaturas', () => {
      spyOn(console, 'error');
      apiServiceSpy.getAsignaturas.and.returnValue(throwError(() => new Error('Error de API')));

      component.ngOnInit();

      expect(console.error).toHaveBeenCalledWith('Error al obtener asignaturas:', jasmine.any(Error));
    });
  });

  describe('generarQr', () => {
    it('debería generar un código QR para la asignatura seleccionada', () => {
      const asignaturaMock = {
        id: 3,
        nombre: 'Química',
        sigla: 'QUI301',
        seccion: 'C',
        docente_id: 1,
        estudiante_id: 103
      };

      component.generarQr(asignaturaMock);

      expect(component.codigoQr).toBe('asignatura:3');
      expect(component.asignaturaSeleccionada).toEqual(asignaturaMock);
    });
  });
});
