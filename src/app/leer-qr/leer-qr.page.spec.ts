import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeerQrPage } from './leer-qr.page';
import { ApiService } from '../services/api.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { of, throwError } from 'rxjs';
import { AlertController } from '@ionic/angular';

describe('LeerQrPage', () => {
  let component: LeerQrPage;
  let fixture: ComponentFixture<LeerQrPage>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;

  beforeEach(async () => {
    // Mock para ApiService y AlertController
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getAsignaturas', 'getAsistenciasPorEstudiante', 'registrarAsistencia']);
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);

    await TestBed.configureTestingModule({
      declarations: [ LeerQrPage ],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: AlertController, useValue: alertControllerSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LeerQrPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  
  it('debería manejar permisos de cámara', async () => {
    // Simulamos que el permiso de la cámara no está otorgado
    spyOn(BarcodeScanner, 'checkPermission').and.returnValue(Promise.resolve({ granted: false, denied: false }));

    await component.scanQRCode();

    fixture.detectChanges();

    expect(component.isScanning).toBe(false);
  });

});
