import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendasPageRoutingModule } from './agendas-routing.module';

import { AgendasPage } from './agendas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendasPageRoutingModule
  ],
  declarations: [AgendasPage]
})
export class AgendasPageModule {}
