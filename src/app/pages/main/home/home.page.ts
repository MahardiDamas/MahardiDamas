import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthService } from '@app/services/auth.service';
import { UtilService } from '@app/services/util.service';
import { ReleaseService } from '@app/pages/page/release/release.service';
import { Tab } from '@app/navigation/tabs/tabs.page';
import { environment } from '@environments/environment.prod';
import { zip } from "rxjs";
import { NavController } from '@ionic/angular';
import { EmployeeService, EmployeeWithNavigationPropertiesDto } from '@app/proxy/employees';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, Tab {

  settings: any = null;
  grantedPolicies: any = null;
  roles: string[];
  employee: EmployeeWithNavigationPropertiesDto;
  photo: string = null;

  release: any[] = [];  
  isSehat: boolean = false;

  constructor(
    private authService: AuthService,
    private utilService: UtilService,
    private storage: Storage,
    private realeaseService: ReleaseService,
    private navCtrl: NavController, 
    private employeeService: EmployeeService
  ) {
    this.release = this.realeaseService.releaseList();
  }

  ngOnInit() {
    // Get Setting > (Settings, Roles)
    // Get Employee
  }

  pageWillReload() { // Eg: Homepage => AttendancePage => HomePage
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    Promise.all([
      this.storage.get(`${environment.appName}_tenant`),
      this.storage.get(`${environment.appName}_access_token`)
    ]).then(([tenant, token]) => { 
      let source$ = zip(
        this.authService.getApplicationConfiguration(tenant.tenantId, token.access_token), 
        this.employeeService.getWithNavigationProperties(this.utilService.guidEmpty())
      );
      source$.subscribe(([configuration, employee]) => {
        // setting
        const settings = configuration['setting']['values'];        
        this.storage.set(`${environment.appName}_settings`, settings)
          .then(() => {
            this.settings = settings;
            this.isSehat = this.getSetting('CORE.Integration.App.Sehat');
          });

        // roles
        const roles = configuration['currentUser']['roles']; 
        this.storage.set(`${environment.appName}_roles`, roles)
          .then(() => {
            this.roles = roles;
          });
        
        // grantedPolicies
        const grantedPolicies = configuration['auth']['grantedPolicies']; 
        this.storage.set(`${environment.appName}_grantedPolicies`, grantedPolicies)
          .then(() => {
            this.grantedPolicies = grantedPolicies;
          });

        // employee
        this.storage.set(`${environment.appName}_employee`, employee)
          .then(() => {
            this.employee = employee;
          });        
      });
    });
  } 
  
  getSetting(name: string) {
    return this.utilService.getSetting(name, this.settings);
  }  

  goToPage(page?: string) {
    this.navCtrl.navigateForward([`./page/${page}`]);
  }
  
}
