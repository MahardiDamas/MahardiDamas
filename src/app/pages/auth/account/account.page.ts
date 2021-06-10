import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '@app/services/auth.service';
import { UtilService } from '@app/services/util.service';
import { environment } from '@environments/environment.prod';
import { EmployeeService, EmployeeWithNavigationPropertiesDto } from '@app/proxy/employees';
import { Constants, ImageDto } from '@app/proxy/shared';

@Component({
  selector: 'page-account',
  templateUrl: 'account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  employee: EmployeeWithNavigationPropertiesDto;
  viewType: string;
  language: string =  null;

  photo: string = null;

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private authService: AuthService,
    private utilService: UtilService,
    private employeeService: EmployeeService
  ) {

  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    var getLanguange = window.localStorage.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    if(getLanguange && getLanguange === 'id') {
      this.language = 'id'
    } else {
      this.language = 'en'
    }

    Promise.all([
      this.storage.get(`${environment.appName}_employee`)
    ]).then(([employee]) => {
      if(employee) {
        this.employee = employee;
        this.getProfilePicture();
      } else {
        this.employeeService.getWithNavigationProperties(
          this.utilService.guidEmpty())
          .subscribe((employee: any) => {
            this.employee = employee;
            this.getProfilePicture();
          });
      }
    });
  }

  setViewType(type: string) {
    this.viewType = type;
  }

  languageConfirm(code: string) {
    this.viewType = null;
    this.language = code;
    this.utilService.setLanguageData(code);
    window.localStorage.setItem(Constants.KEY_DEFAULT_LANGUAGE, code);
  }

  getProfilePicture() {
    this.employeeService.getProfilePicture(this.employee.employee.userId)
    .subscribe((data: ImageDto) => {
      this.photo = this.utilService.base64(data.fileContent);
    });
  }

  // goProfile() {
  //   this.navCtrl.navigateForward('/auth/profile')
  // }

  logout() {
    this.utilService.loadingPresent('Please wait...');
    this.authService.logout()
      .subscribe(() => {
        Promise.all([
          // this.notificationService.removeTokenFromTopic(this.employee.deviceId, `attendance-${this.employee.tenantId}`),
          // this.notificationService.removeTokenFromTopic(this.employee.deviceId, `announcement-${this.employee.tenantId}`),
          // this.notificationService.removeTokenFromTopic(this.employee.deviceId, `news-${this.employee.tenantId}`),
          // this.notificationService.removeTokenFromTopic(this.employee.deviceId, `birthday-${this.employee.tenantId}`),
          // this.notificationService.removeTokenFromTopic(this.employee.deviceId, `birthday-${this.employee.id}`),
          this.storage.remove(`${environment.appName}_tenant`),
          this.storage.remove(`${environment.appName}_access_token`),
          this.storage.remove(`${environment.appName}_configurations`),
          this.storage.remove(`${environment.appName}_employee`),
          this.storage.remove(`${environment.appName}_deviceTokenId`)
        ]).then(() => {
          this.utilService.loadingDismiss();
          this.navCtrl.navigateRoot(['./auth/login'])
        });
      })
  }
}
