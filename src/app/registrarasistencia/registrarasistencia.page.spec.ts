import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarAsistenciaPage } from './registrarasistencia.page';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importar el módulo de pruebas para HttpClient
import { IonicModule } from '@ionic/angular';

describe('RegistrarasistenciaPage', () => {
  let component: RegistrarAsistenciaPage;
  let fixture: ComponentFixture<RegistrarAsistenciaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarAsistenciaPage],
      imports: [
        IonicModule.forRoot(), 
        HttpClientTestingModule // Importar el módulo necesario
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
