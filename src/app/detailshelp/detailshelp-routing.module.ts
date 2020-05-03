import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailshelpPage } from './detailshelp.page';

const routes: Routes = [
  {
    path: '',
    component: DetailshelpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailshelpPageRoutingModule {}
