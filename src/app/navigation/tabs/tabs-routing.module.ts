import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'blogs',
        children: [
          {
            path: '',
            //loadChildren: () => import('@app-pages/main/blogs/blogs.module').then(m => m.BlogsPageModule)
            loadChildren: () => import('@app-pages/page/about/about.module').then(m => m.AboutPageModule)
          }
        ]
      },
      {
        path: 'chats',
        children: [
          {
            path: '',
            //loadChildren: () => import('@app-pages/main/chats/chats.module').then(m => m.ChatsPageModule)
            loadChildren: () => import('@app-pages/page/about/about.module').then(m => m.AboutPageModule)
          }
        ]
      },      
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('@app-pages/main/home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'notification',
        children: [
          {
            path: '',
            //loadChildren: () => import('@app-pages/page/notifications/notifications.module').then(m => m.NotificationsPageModule)
            loadChildren: () => import('@app-pages/page/about/about.module').then(m => m.AboutPageModule)
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () => import('@app-pages/auth/account/account.module').then(m => m.AccountPageModule)
          },
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

