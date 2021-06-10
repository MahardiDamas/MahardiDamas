import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { MenuComponent } from './menu/menu.component';
import { BannerComponent } from './banner/banner.component';
import { ProfileComponent } from './profile/profile.component';
import { TruncateTextPipe } from '@app/pipes/truncate-text.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    MenuComponent,
    BannerComponent,
    ProfileComponent,
    TruncateTextPipe
  ]
})
export class HomePageModule {}
