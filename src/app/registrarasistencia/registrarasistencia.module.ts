import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarasistenciaPageRoutingModule } from './registrarasistencia-routing.module';

import { RegistrarAsistenciaPage } from './registrarasistencia.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarasistenciaPageRoutingModule
  ],
  declarations: [RegistrarAsistenciaPage]
})
export class RegistrarasistenciaPageModule {}

