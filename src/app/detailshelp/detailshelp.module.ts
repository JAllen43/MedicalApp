import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailshelpPageRoutingModule } from './detailshelp-routing.module';

import { DetailshelpPage } from './detailshelp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailshelpPageRoutingModule
  ],
  declarations: [DetailshelpPage]
})
export class DetailshelpPageModule {}
