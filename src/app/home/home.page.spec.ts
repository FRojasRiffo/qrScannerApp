import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { of } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Crear un espía para ApiService
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getUsuarios']);
    // Simular respuesta de getUsuarios
    apiServiceSpy.getUsuarios.and.returnValue(of([])); // Devuelve un Observable vacío

    // Crear un espía para Router
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: AlertController, useValue: jasmine.createSpyObj('AlertController', ['create']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba: Comprobar que el componente se crea correctamente
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
