import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignaturasDocentePage } from './asignaturas-docente.page';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importar el módulo de pruebas para HttpClient
import { IonicModule } from '@ionic/angular';

describe('AsignaturasDocentePage', () => {
  let component: AsignaturasDocentePage;
  let fixture: ComponentFixture<AsignaturasDocentePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsignaturasDocentePage],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule // Importar el módulo necesario
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AsignaturasDocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
