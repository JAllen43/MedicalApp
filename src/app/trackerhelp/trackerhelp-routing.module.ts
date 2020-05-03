import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackerhelpPage } from './trackerhelp.page';

const routes: Routes = [
  {
    path: '',
    component: TrackerhelpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackerhelpPageRoutingModule {}
