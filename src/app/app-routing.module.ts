import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SelectionComponent } from './selection/selection.component';
import { GraphsComponent } from './graphs/graphs.component';

const routes: Routes = [
  {path:'login',component : LoginComponent},
  {path:'selection',component:SelectionComponent},
  {path:'graphs',component:GraphsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
