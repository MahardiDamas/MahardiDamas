import { Component, Inject } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { APP_CONFIG, AppConfig } from './app.config';
import { AuthService } from '@app/services/auth.service';
import { UtilService } from '@app/services/util.service';
import { environment } from '@environments/environment.prod';
import { EmployeeNotificationService } from './proxy/employee-notifications';
import { Constants } from './proxy/shared';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    @Inject(APP_CONFIG)
    public config: AppConfig,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private router: Router,
    private storage: Storage,
    private navCtrl: NavController,
    private authService: AuthService,
    private utilService: UtilService,
    private notification: EmployeeNotificationService
  ) {
    this.utilService.getLanguageObservable().subscribe((value) => {
      this.globalize(value);
    })
    this.initializeApp();
    this.getLanguage();
    this.themes();
    this.backButton();
    this.reLogin();
    this.getNotification();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#FDB915');
      this.splashScreen.hide();
      let defaultLang = window.localStorage.getItem(Constants.KEY_DEFAULT_LANGUAGE);
      this.globalize(defaultLang);
    });
  }

  getLanguage() {
    this.utilService.getLanguageObservable()
      .subscribe(value => {
        this.globalize(value);
    });
  }  

  globalize(languagePriority: string) {
    moment.locale('id');
    this.translate.setDefaultLang("en");
    let defaultLangCode = this.config.availableLanguages[0].code;
    this.translate.use(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
  }

  themes() {
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      console.log('🎉 Dark mode is supported');
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    toggleDarkTheme(prefersDark.matches);

    prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));

    function toggleDarkTheme(shouldAdd: boolean) {
      document.body.classList.toggle('dark', shouldAdd);
    }
  }

  backButton() {
    this.platform.backButton.subscribe(() => {
      if (this.router.url === '/'
        || this.router.url === '/page/landing'
        || this.router.url === '/tabs'
        || this.router.url === '/tabs/blogs'
        || this.router.url === '/tabs/chats'
        || this.router.url === '/tabs/home'
        || this.router.url === '/tabs/notification'
        || this.router.url === '/tabs/account'
        || this.router.url === '/auth/login') {
        navigator['app'].exitApp();
      } else {
        return
      }
    });
  }

  reLogin() : void {
    Promise.all([
      this.storage.get(`${environment.appName}_tenant`),
      this.storage.get(`${environment.appName}_credential`)
    ]).then(([tenant, authData]) => {
      if(tenant && authData) {
        this.utilService.loadingPresent('Let you login please wait...');
        this.authService.login(authData, tenant.tenantId)
          .subscribe((token: any) => {
            this.storage.set(`${environment.appName}_access_token`, token)
            .then(() => {
              this.utilService.loadingDismiss()
                .then(() => {
                  this.navCtrl.navigateRoot(['./tabs']);
                });            
            }, () => {
              this.utilService.loadingDismiss()
                .then(() => {
                  this.storage.remove(`${environment.appName}_access_token`);
                  this.navCtrl.navigateRoot(['./auth/login']);
                });            
            });
          }, () => {
            this.loginError();
          });
      } else {
        this.loginError();
      }
    });
  }

  loginError() {
    this.utilService.notificationAuthentication.next('Authentication failed');
    this.storage.remove(`${environment.appName}_tenant`);
    this.storage.remove(`${environment.appName}_credential`);
    this.storage.remove(`${environment.appName}_access_token`);    
    this.navCtrl.navigateRoot(['./auth/login']);
  }

  getNotification() {
    if (this.platform.is('cordova')) {
      this.notification;
    }
  }
}
