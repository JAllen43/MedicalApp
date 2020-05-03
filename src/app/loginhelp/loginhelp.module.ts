import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginhelpPageRoutingModule } from './loginhelp-routing.module';

import { LoginhelpPage } from './loginhelp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginhelpPageRoutingModule
  ],
  declarations: [LoginhelpPage]
})
export class LoginhelpPageModule {}
