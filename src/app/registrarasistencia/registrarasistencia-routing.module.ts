import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarAsistenciaPage } from './registrarasistencia.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarasistenciaPageRoutingModule {}
