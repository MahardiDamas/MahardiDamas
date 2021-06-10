import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedActivityPage } from './shared-activity.page';

const routes: Routes = [
  {
    path: '',
    component: SharedActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedActivityPageRoutingModule {}
