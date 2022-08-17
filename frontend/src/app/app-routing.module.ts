import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './login.guard';
import { LogoutGuard } from './logout.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
  {
    path: 'movie',
    loadChildren: () => import('./movie/movie.module').then(m => m.MovieModule),
    canActivate: [LoginGuard]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
