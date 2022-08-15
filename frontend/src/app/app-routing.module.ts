import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './login.guard';
import { LogoutGuard } from './logout.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'common',
    loadChildren: () => import('./shared/shared.module').then(s => s.SharedModule),
    canActivate: [LogoutGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(u => u.UserModule),
    canActivate: [LoginGuard]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
