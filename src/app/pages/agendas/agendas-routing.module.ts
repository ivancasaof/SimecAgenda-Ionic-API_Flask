import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendasPage } from './agendas.page';

const routes: Routes = [
  {
    path: '',
    component: AgendasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendasPageRoutingModule {}
