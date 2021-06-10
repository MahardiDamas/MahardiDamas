import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, NavController, Platform } from '@ionic/angular';
import { AuthService } from '@app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { UtilService } from '@app/services/util.service';
import { ReleaseService } from '@app/pages/page/release/release.service';
import { environment } from '@environments/environment.prod';

@Component({
  selector: 'page-login',
  templateUrl: 'login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('tenant', {static: false})  tenantInput: IonInput;
  @ViewChild('userName', {static: false})  userNameInput: IonInput;
  @ViewChild('password', {static: false})  passwordInput: IonInput; 

  formTenant: FormGroup;
  formLogin: FormGroup;
  showLoading: boolean = false;
  tenantName: string = null;
  tenantMessage: string = null;
  loginMessage: string = null;
  loginFailed: number = 0;
  release: any[] = [];

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private fb: FormBuilder,
    private storage: Storage,
    private utilService: UtilService,
    private realeaseService: ReleaseService
  ) {
    this.buildFormLogin();
    this.release = this.realeaseService.releaseList();
  }

  ngOnInit() {
    this.storage.get(`${environment.appName}_tenant`)
    .then((tenant) => {
      if (tenant) {
        this.formLogin.patchValue({ tenantName: tenant.name });   
      }
    });
  }

  buildFormLogin() {
    this.formLogin = this.fb.group({
      tenantName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.formLogin.invalid) {
      return;
    }
    this.utilService.loadingPresent('Let you login please wait...');
    const authData = this.formLogin.getRawValue();     
    this.authService.getTenantByName(authData.tenantName)
      .subscribe((tenant: any) => { // If success
        this.tenantMessage = null;
        if (tenant.success && tenant.tenantId !== null) {
          this.authService.login(authData, tenant.tenantId)
            .subscribe((token: any) => { // If success
              this.loginMessage = null;
              if (tenant && token){                
                this.storage.set(`${environment.appName}_credential`, authData);
                this.storage.set(`${environment.appName}_tenant`, tenant);
                this.storage.set(`${environment.appName}_access_token`, token);
                this.storage.set(`${environment.appName}_timezone_info`, this.utilService.timezoneInfo());
                this.storage.set(`${environment.appName}_timezone_offset`, this.utilService.timezoneOffset()); 
                this.utilService.loadingDismiss()
                  .then(() => {
                    this.navCtrl.navigateRoot(['./tabs']);
                  });
              }
            }, (e) => { // If error
              this.utilService.loadingDismiss().then(() => {
                this.formLogin.reset();
                if(e.error.error === 'invalid_grant') {
                  this.loginFailed = e.error.error_description;
                }
                this.loginMessage = `Authentication failed (${this.loginFailed})`;
                //this.navCtrl.navigateRoot(['./auth/login']);
                return;
              });              
            });
        } else { // If value null
          this.utilService.loadingDismiss().then(() => {
            this.formLogin.reset();
            this.loginMessage = 'No Available Tenant';     
            //this.navCtrl.navigateRoot(['./auth/login']); 
            return;
          });          
        }
    }, () => { // If error
      this.utilService.loadingDismiss();
      this.formLogin.reset();
      this.loginMessage = 'No Available Tenant';     
      //this.navCtrl.navigateRoot(['./auth/login']); 
      return;
    })
  }

  message(error: any) {
    return error.error.error_description || error.error.error.message;
  }

  goToPage(page?: string) {
    this.navCtrl.navigateForward([`./page/${page}`]);
  }

  forgotPassword() {
    this.navCtrl.navigateForward('/auth/forgot-password');
  }
}
