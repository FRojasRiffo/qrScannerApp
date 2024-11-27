import { TestBed } from '@angular/core/testing';
import { CambiarClavePage } from './cambiarclave.page';
import { ApiService } from '../services/api.service';
import { of, throwError } from 'rxjs';
import { Usuario } from '../models/models';

describe('CambiarClavePage', () => {
  let component: CambiarClavePage;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  const mockUsuario: Usuario = {
    id: 1,
    nombre: 'John Doe',
    correo: 'john.doe@example.com',
    contraseña: '1234',
    tipo: 'admin',
  };

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['getUsuarios', 'updateUsuario']);
    TestBed.configureTestingModule({
      providers: [
        CambiarClavePage,
        { provide: ApiService, useValue: spy },
      ],
    });
    component = TestBed.inject(CambiarClavePage);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('debería inicializar usuario actual correctamente', () => {
    const mockUsuarios: Usuario[] = [mockUsuario];
    localStorage.setItem('usuarioId', '1');
    apiServiceSpy.getUsuarios.and.returnValue(of(mockUsuarios));

    component.cargarUsuarioActual();

    expect(apiServiceSpy.getUsuarios).toHaveBeenCalled();
    expect(component.usuarioActual?.id).toBe(1);
  });

  it('debería mostrar error si falla la carga del usuario', () => {
    apiServiceSpy.getUsuarios.and.returnValue(throwError('Error al cargar usuarios'));

    component.cargarUsuarioActual();

    expect(component.usuarioActual).toBeNull();
    expect(apiServiceSpy.getUsuarios).toHaveBeenCalled();
  });

  it('debería fallar validación si las claves no coinciden', () => {
    component.usuarioActual = mockUsuario;
    component.claveIngresada = '1234';
    component.nuevaClave = '5678';
    component.confirmarClave = '5679';

    expect(component.validarCambioClave()).toBeFalse();
  });

  it('debería fallar validación si la clave actual es incorrecta', () => {
    component.usuarioActual = mockUsuario;
    component.claveIngresada = '4321';
    component.nuevaClave = '5678';
    component.confirmarClave = '5678';

    expect(component.validarCambioClave()).toBeFalse();
  });


  it('debería manejar error al cambiar la clave', () => {
    component.usuarioActual = mockUsuario;
    component.claveIngresada = '1234';
    component.nuevaClave = '5678';
    component.confirmarClave = '5678';
    apiServiceSpy.updateUsuario.and.returnValue(throwError('Error al cambiar clave'));

    component.cambiarClave();

    expect(component.mensaje).toBe('Error al cambiar la clave');
  });

  it('debería mostrar mensaje si falla la validación de la clave', () => {
    component.usuarioActual = mockUsuario;
    component.claveIngresada = '4321';
    component.nuevaClave = '5678';
    component.confirmarClave = '5678';

    component.cambiarClave();

    expect(component.mensaje).toBe('La validación de la clave ha fallado');
  });

  it('debería limpiar las claves después de mostrar mensaje', () => {
    component.mostrarMensaje('Test');

    expect(component.claveIngresada).toBe('');
    expect(component.nuevaClave).toBe('');
    expect(component.confirmarClave).toBe('');
  });

  it('debería manejar caso donde no hay usuario actual', () => {
    component.usuarioActual = null;
    component.claveIngresada = '1234';
    component.nuevaClave = '5678';
    component.confirmarClave = '5678';

    component.cambiarClave();

    expect(component.mensaje).toBe('La validación de la clave ha fallado');
  });
});
