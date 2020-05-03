import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackerhelpPageRoutingModule } from './trackerhelp-routing.module';

import { TrackerhelpPage } from './trackerhelp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackerhelpPageRoutingModule
  ],
  declarations: [TrackerhelpPage]
})
export class TrackerhelpPageModule {}
