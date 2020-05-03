import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginhelpPage } from './loginhelp.page';

const routes: Routes = [
  {
    path: '',
    component: LoginhelpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginhelpPageRoutingModule {}
