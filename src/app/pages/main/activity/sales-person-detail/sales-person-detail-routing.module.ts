import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesPersonDetailPage } from './sales-person-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SalesPersonDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesPersonDetailPageRoutingModule {}
