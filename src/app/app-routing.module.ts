import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { LoginComponent } from './routes/login/login.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { RequestComponent } from './routes/request/request.component';
import { AllRequestComponent } from './routes/all-request/all-request.component';

const routes: Routes = [
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'pedidos', component: RequestComponent },
      { path: 'todos', component: AllRequestComponent }
    ]
  },
  {
    path: '',
    component: LoginComponent
  },
  // Not found
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
