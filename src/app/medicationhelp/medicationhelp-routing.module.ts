import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicationhelpPage } from './medicationhelp.page';

const routes: Routes = [
  {
    path: '',
    component: MedicationhelpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicationhelpPageRoutingModule {}
