import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '@app/services/util.service';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { environment } from '@environments/environment.prod';
import { EmployeeWithNavigationPropertiesDto } from '@app/proxy/employees';
import { EmployeeNotificationService } from '@app/proxy/employee-notifications';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notificationList: any[] = [];
  employee: EmployeeWithNavigationPropertiesDto;
  tenantId: any = null;

  constructor(
    private notificationService: EmployeeNotificationService,
    private utilService: UtilService,
    private storage: Storage
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.utilService.loadingPresent('Please wait...')
      .then(() => {
        Promise.all([
          this.storage.get(`hure_${environment.appName}_employee`),
          this.storage.get(`hure_${environment.appName}_tenant`)
        ]).then(([employee, tenant]) => {
          this.employee = employee;
          this.tenantId = tenant.tenantId;
          this.getNotification(employee, tenant.tenantId);
        })
      });
  }

  getNotification(employee: EmployeeWithNavigationPropertiesDto, tenantId: string) {
    let _notification: any[] = [];
    this.notificationService.get(tenantId, 15, 0).subscribe((result) => {
      _notification = result.items;
      this.utilService.loadingDismiss();
    });
  }
}
