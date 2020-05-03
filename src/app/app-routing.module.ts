import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'medication',
    loadChildren: () => import('./medication/medication.module').then( m => m.MedicationPageModule)
  },
  {
    path: 'tracker',
    loadChildren: () => import('./tracker/tracker.module').then( m => m.TrackerPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'medicationhelp',
    loadChildren: () => import('./medicationhelp/medicationhelp.module').then( m => m.MedicationhelpPageModule)
  },
  {
    path: 'loginhelp',
    loadChildren: () => import('./loginhelp/loginhelp.module').then( m => m.LoginhelpPageModule)
  },
  {
    path: 'trackerhelp',
    loadChildren: () => import('./trackerhelp/trackerhelp.module').then( m => m.TrackerhelpPageModule)
  },
  {
    path: 'profilehelp',
    loadChildren: () => import('./profilehelp/profilehelp.module').then( m => m.ProfilehelpPageModule)
  },
  {
    path: 'detailshelp',
    loadChildren: () => import('./detailshelp/detailshelp.module').then( m => m.DetailshelpPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
