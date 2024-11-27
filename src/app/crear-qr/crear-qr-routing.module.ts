import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearQrPage } from './crear-qr.page';

const routes: Routes = [
  {
    path: '',
    component: CrearQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearQrPageRoutingModule {}
