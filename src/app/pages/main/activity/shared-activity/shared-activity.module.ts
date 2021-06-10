import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedActivityPageRoutingModule } from './shared-activity-routing.module';

import { SharedActivityPage } from './shared-activity.page';
import { TranslateModule } from '@ngx-translate/core';
import { SalesActivityOverviewPage } from '../sales-activity-overview/sales-activity-overview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedActivityPageRoutingModule,
    TranslateModule
  ],
  declarations: [
    SharedActivityPage, 
    SalesActivityOverviewPage
  ],
  exports: [
    TranslateModule,
    SalesActivityOverviewPage
  ]
})
export class SharedActivityPageModule {}
