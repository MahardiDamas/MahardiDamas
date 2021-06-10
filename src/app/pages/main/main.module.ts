import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [ 
      {
        path: 'activity',
        children: [
          {
            path: 'sales-activity',
            loadChildren: () => import('@app-pages/main/activity/sales-activity.module').then(m => m.SalesActivityPageModule)
          },
        ]        
      },     
      {
        path: 'blogs',
        children: [
          {
            path: '',
            loadChildren: () => import('@app-pages/main/blogs/blogs.module').then(m => m.BlogsPageModule)
          },
          {
            path: 'blog-post',
            loadChildren: () => import('@app-pages/main/blogs/blog-post/blog-post.module').then(m => m.BlogPostPageModule)
          }
        ]
      },
      {
        path: 'chats',
        children: [
          {
            path: '',
            loadChildren: () => import('@app-pages/main/chats/chats.module').then(m => m.ChatsPageModule)
          },
          {
            path: 'conversation',
            loadChildren: () => import('@app-pages/main/chats/conversation/conversation.module').then(m => m.ConversationPageModule)
          }
        ]
      },
      {
        path: 'home',
        children: [
          {
            path: 'home',
            loadChildren: () => import('@app-pages/main/home/home.module').then(m => m.HomePageModule)
          },
        ]        
      },
      {
        path: 'news',
        children: [
          {
            path: 'news',
            loadChildren: () => import('@app-pages/main/news/news.module').then(m => m.NewsPageModule)
          },
        ]        
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainModule { }
