import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      children: [
        {
          path: 'account',
          loadChildren: () => import('@app-pages/auth/account/account.module').then(m => m.AccountPageModule)
        },
        {
          path: 'forgot-password',
          loadChildren: () => import('@app-pages/auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
        },
        {
          path: 'login',
          loadChildren: () => import('@app-pages/auth/login/login.module').then(m => m.LoginModule)
        },                  
        {
          path: 'profile',
          loadChildren: () => import('@app-pages/auth/profile/profile.module').then(m => m.ProfilePageModule)
        },      
      ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthModule { }
