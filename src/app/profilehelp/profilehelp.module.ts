import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilehelpPageRoutingModule } from './profilehelp-routing.module';

import { ProfilehelpPage } from './profilehelp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilehelpPageRoutingModule
  ],
  declarations: [ProfilehelpPage]
})
export class ProfilehelpPageModule {}
