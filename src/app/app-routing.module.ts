import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'asignaturas',
    loadChildren: () => import('./asignaturas/asignaturas.module').then(m => m.AsignaturasPageModule)
  },
  {
    path: 'asignaturas-docente',
    loadChildren: () => import('./asignaturas-docente/asignaturas-docente.module').then(m => m.AsignaturasDocentePageModule)
  },
  {
    path: 'asistencias',
    loadChildren: () => import('./asistencias/asistencias.module').then(m => m.AsistenciasPageModule)
  },
  {
    path: 'cambiarclave',
    loadChildren: () => import('./cambiarclave/cambiarclave.module').then(m => m.CambiarClavePageModule)
  },
  {
    path: 'crear-qr',
    loadChildren: () => import('./crear-qr/crear-qr.module').then(m => m.CrearQrPageModule)
  },
  {
    path: 'leer-qr',
    loadChildren: () => import('./leer-qr/leer-qr.module').then(m => m.LeerQrPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registrarasistencia',
    loadChildren: () => import('./registrarasistencia/registrarasistencia.module').then(m => m.RegistrarasistenciaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
