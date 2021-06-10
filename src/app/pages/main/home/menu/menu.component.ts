import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { UtilService } from '@app/services/util.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
//import { environment } from '@environments/environment.prod';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnChanges {

  @Input() route: string = null;

  @Input() title: string = null;

  @Input() icon: string = 'ic_nearby';

  @Input() permission: string = null;

  @Input() grantedPolicies: any = null;

  isGranted: boolean = false;

  constructor(
    private navCtrl: NavController,
    private utilService: UtilService,
    //private storage: Storage,
  ) { 

  }

  ngOnInit() {}

  ngOnChanges() {
    this.isGranted = this.getGranted(this.permission, this.grantedPolicies);     
  }

  getGranted(name: string, grantedPolicies: any) {
    return grantedPolicies !== null ? this.utilService.getGranted(name, grantedPolicies) : false;
  }

  getIcon(name: string) {
    return `assets/images/${name}`
  }

  goToPage(route: string, title: string, enabled: boolean = false) {
    if(enabled) {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          title: title
        }
      }

      this.navCtrl.navigateForward([route], navigationExtras);
      
    }    
  }

}
