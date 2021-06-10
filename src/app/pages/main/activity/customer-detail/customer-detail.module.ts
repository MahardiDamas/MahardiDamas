import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CustomerDetailPage } from './customer-detail.page';
import { CustomerDetailRoutingModule } from './customer-detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    CustomerDetailRoutingModule
  ],
  declarations: [CustomerDetailPage]
})
export class CustomerDetailPageModule {}