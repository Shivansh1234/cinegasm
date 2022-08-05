import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login.guard';
import { LogoutGuard } from './logout.guard';

const routes: Routes = [
  {
    path: 'common',
    loadChildren: () => import('./shared/shared.module').then(s => s.SharedModule),
    canActivate: [LogoutGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(u => u.UserModule),
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
