import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesActivityPage } from './sales-activity.page';

const routes: Routes = [
  {
    path: '',
    component: SalesActivityPage
  },
  {
    path: 'sales-activity-detail',
    loadChildren: () => import('./sales-activity-detail/sales-activity-detail.module').then( m => m.SalesActivityDetailPageModule)
  },
  {
    path: 'customer-detail',
    loadChildren: () => import('./customer-detail/customer-detail.module').then( m => m.CustomerDetailPageModule)
  },
  {
    path: 'shared-activity',
    loadChildren: () => import('./shared-activity/shared-activity.module').then( m => m.SharedActivityPageModule)
  },
  {
    path: 'sales-person-detail',
    loadChildren: () => import('./sales-person-detail/sales-person-detail.module').then( m => m.SalesPersonDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesActivityRoutingModule {}