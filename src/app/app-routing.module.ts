import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RequestPlasmaComponentComponent } from './request-plasma-component/request-plasma-component.component';

const routes: Routes = [
  {path:'',component:HomeComponentComponent},
  {path:'request-plasma',component:RequestPlasmaComponentComponent},
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
