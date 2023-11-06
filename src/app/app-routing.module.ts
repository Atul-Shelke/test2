import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './common-components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'',redirectTo:'auth',pathMatch:'full'},
  {path:'auth',loadChildren:()=>import('./auth/auth/auth.module').then(m=>m.AuthModule)},
  {path:'dashboard',loadChildren:()=>import('./components/dashboard/dashboard.module').then(m=>m.DashboardModule)},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
