import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesPersonDetailPageRoutingModule } from './sales-person-detail-routing.module';

import { SalesPersonDetailPage } from './sales-person-detail.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedActivityPageModule } from '../shared-activity/shared-activity.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesPersonDetailPageRoutingModule,
    TranslateModule,
    SharedActivityPageModule
  ],
  declarations: [SalesPersonDetailPage]
})
export class SalesPersonDetailPageModule {}
