import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicationhelpPageRoutingModule } from './medicationhelp-routing.module';

import { MedicationhelpPage } from './medicationhelp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicationhelpPageRoutingModule
  ],
  declarations: [MedicationhelpPage]
})
export class MedicationhelpPageModule {}
