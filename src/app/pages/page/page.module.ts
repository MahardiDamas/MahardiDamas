import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'about',
        loadChildren: () => import('@app-pages/page/about/about.module').then(m => m.AboutPageModule)
      },
      {
        path: 'landing',
        loadChildren: () => import('@app-pages/page/landing/landing.module').then(m => m.LandingPageModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('@app-pages/page/notifications/notifications.module').then(m => m.NotificationsPageModule)
      },      
      {
        path: 'release',
        loadChildren: () => import('@app-pages/page/release/release.module').then(m => m.ReleasePageModule)
      },
      {
        path: 'tutorial',
        loadChildren: () => import('@app-pages/page/tutorial/tutorial.module').then(m => m.TutorialPageModule)
      }      
    ]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageModule { }
