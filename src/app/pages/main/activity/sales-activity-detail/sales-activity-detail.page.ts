import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '@app/services/util.service';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { CustomerPage } from '../customer/customer.page';
import * as moment from 'moment';
import { SalesActivityService, SalesActivityWithNavigationPropertiesDto } from '@app/proxy/sales-activities';
import { EmployeeWithNavigationPropertiesDto } from '@app/proxy/employees';
import { CustomerDto } from '@app/proxy/customers';
import { zip } from 'rxjs';
import { LookupDto, PagedResultDto } from '@app/proxy/shared';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-sales-activity-detail',
  templateUrl: './sales-activity-detail.page.html',
  styleUrls: ['./sales-activity-detail.page.scss'],
})
export class SalesActivityDetailPage implements OnInit {

  title: string = null;

  form: FormGroup;

  selected?: SalesActivityWithNavigationPropertiesDto = null;

  employee: EmployeeWithNavigationPropertiesDto;

  activityCategoryList: PagedResultDto<LookupDto> = {
    items: [],
    totalCount: 0,
  };

  activityTypeList: PagedResultDto<LookupDto> = {
    items: [],
    totalCount: 0,
  };

  activityStatusList: PagedResultDto<LookupDto> = {
    items: [],
    totalCount: 0,
  };

  selectedCustomer: CustomerDto = null;

  checkInPhoto: string;

  checkOutPhoto: string;

  minDate = moment().subtract(0, 'days').format('YYYY-MM-DD');
  maxDate = moment().add(31, 'days').format('YYYY-MM-DD');

  constructor(
    private activeRoute: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private utilService: UtilService,
    private service: SalesActivityService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private platform: Platform
  ) {

  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      this.title = params.title; 
      this.selected = params.data;
      this.employee = params.employee;
    });

    this.buildForm();

    let source$ = zip(
      this.service.getActivityCategoryLookup(),
      this.service.getActivityTypeLookup(),
      this.service.getActivityStatusLookup()      
    )
    source$.subscribe(([category, type, status]) => {
      this.activityCategoryList = category;
      this.activityTypeList = type;
      this.activityStatusList = status;
    });
  }

  ionViewWillEnter() {
    
  }

  buildForm() {
    const {
      number,
      title,
      description,
      planDateTime,
      dateTime,
      checkinTime,
      timezoneInfoIn,
      timezoneOffsetIn,
      checkInLocation,
      checkInLatitude,
      checkInLongitude,
      checkInPhoto,
      checkOutTime,
      timezoneInfoOut,
      timezoneOffsetOut,
      checkOutLocation,
      checkOutLatitude,
      checkOutLongitude,
      checkOutPhoto,
      remarks,
      totalTime,
      visitCount,
      custPicName,
      custPicTitle,
      custPicPhone1,
      custPicPhone2,
      custPicEmail,
      noteBySupervisor,
      nextActivityDate,
      nextActivityCode,
      lastActivityCode,
      isCreateAsNextPlan,
      createNextPlanDate,
      approved1DateTime,
      approved1Status,
      approved2DateTime,
      approved2Status,
      day,
      dayName,
      week,
      month,
      year,
      companyId,
      employeeId,
      activityTypeId,
      activityStatusId,
      customerId,
      nextActivityTypeId,
      supervisorId,
      approved1ById,
      approved2ById,
      activityCategoryId
    } = this.selected?.salesActivity || {};

    this.form = this.fb.group({
      number: [number ?? null, []],
      title: [title ?? null, [Validators.required]],
      description: [description ?? null, []],
      planDateTime: [planDateTime ? new Date(planDateTime).toISOString() : new Date().toISOString(), []],
      dateTime: [dateTime ? new Date(dateTime) : null, []],
      checkinTime: [checkinTime ? new Date(checkinTime) : null, []],
      timezoneInfoIn: [timezoneInfoIn ?? null, []],
      timezoneOffsetIn: [timezoneOffsetIn ?? this.utilService.timezoneOffset(), []],
      checkInLocation: [checkInLocation ?? null, []],
      checkInLatitude: [checkInLatitude ?? null, []],
      checkInLongitude: [checkInLongitude ?? null, []],
      checkInPhoto: [checkInPhoto ?? null, []],
      checkOutTime: [checkOutTime ? new Date(checkOutTime) : null, []],
      timezoneInfoOut: [timezoneInfoOut ?? null, []],
      timezoneOffsetOut: [timezoneOffsetOut ?? this.utilService.timezoneOffset(), []],
      checkOutLocation: [checkOutLocation ?? null, []],
      checkOutLatitude: [checkOutLatitude ?? null, []],
      checkOutLongitude: [checkOutLongitude ?? null, []],
      checkOutPhoto: [checkOutPhoto ?? null, []],
      remarks: [remarks ?? null, []],
      totalTime: [totalTime ?? 0, []],
      visitCount: [visitCount ?? 0, []],
      custPicName: [custPicName ?? null, []],
      custPicTitle: [custPicTitle ?? null, []],
      custPicPhone1: [custPicPhone1 ?? null, []],
      custPicPhone2: [custPicPhone2 ?? null, []],
      custPicEmail: [custPicEmail ?? null, []],
      noteBySupervisor: [noteBySupervisor ?? null, []],
      nextActivityDate: [nextActivityDate ? new Date(nextActivityDate).toISOString() : null, []],
      nextActivityCode: [nextActivityCode ?? null, []],
      lastActivityCode: [lastActivityCode ?? null, []],
      isCreateAsNextPlan: [isCreateAsNextPlan ?? false, []],
      createNextPlanDate: [createNextPlanDate ? new Date(createNextPlanDate) : null, []],
      approved1DateTime: [approved1DateTime ? new Date(approved1DateTime) : null, []],
      approved1Status: [approved1Status ?? 0, []],
      approved2DateTime: [approved2DateTime ? new Date(approved2DateTime) : null, []],
      approved2Status: [approved2Status ?? 0, []],
      day: [day ?? 0, []],
      dayName: [dayName ?? 0, []],
      week: [week ?? 0, []],
      month: [month ?? 0, []],
      year: [year ?? 0, []],
      companyId: [companyId ?? null, [Validators.required]],
      employeeId: [employeeId ?? null, [Validators.required]],
      activityTypeId: [activityTypeId ?? null, [Validators.required]],
      activityStatusId: [activityStatusId ?? null, []],
      customerId: [customerId ?? null, [Validators.required]],
      nextActivityTypeId: [nextActivityTypeId ?? null, []],
      supervisorId: [supervisorId ?? null, []],
      approved1ById: [approved1ById ?? null, []],
      approved2ById: [approved2ById ?? null, []],
      activityCategoryId: [activityCategoryId ?? null, []],
    });
  }

  changeDateStart(date: any) {
    console.log(date);
  }

  async selectCustomer() {
    const modal = await this.modalCtrl.create({
      component: CustomerPage,
      componentProps: {
        'employee': this.employee
      }
    });

    await modal.present();

    modal.onDidDismiss().then((data) => {
      if(data.data !== undefined) {
        const item = data.data.item;
        this.form.patchValue({ customerId: item.customer.id });
        if(this.selected == null) {
          this.selectedCustomer = item.customer;
          this.form.patchValue({
            custPicName: this.selectedCustomer.pic,
            custPicPhone1: this.selectedCustomer.phone1,
            custPicEmail: this.selectedCustomer.picEmail
          });
        } else {
          this.selected.customer.customer = item.customer;
        } 
      }           
    });    
  }

  activityCategoryChange(event: any) {
    this.form.patchValue({ activityCategoryId: event.detail.value });
  }

  activityTypeChange(event: any) {
    this.form.patchValue({ 
      companyId: this.employee.employee.companyId,
      employeeId: this.employee.employee.id,
      activityTypeId: event.detail.value
     });
  }

  activityStatusChange(event: any) {
    this.form.patchValue({ activityStatusId: event.detail.value });
  }

  isCreateAsNextPlan(event: any) {
    this.selected.salesActivity.isCreateAsNextPlan = event.detail.value;
  }

  create() {
    if (this.form.invalid) {
      return;
    }

    this.form.patchValue({ checkInLocation: null })

    this.utilService.loadingPresent('Please wait...')
    .then(() => {
      if(this.selected === null) {        
        this.service.add(this.form.value)
        .subscribe(() => {
          this.utilService.loadingDismiss();
          this.navCtrl.navigateForward('/main/activity/sales-activity');
        }, () => {
          this.utilService.loadingDismiss();
          this.utilService.toast('Create Activity failed !', 'top');
        });
      } else {
        this.service.update(this.form.value, this.selected.salesActivity.id)
          .subscribe(() => {
            this.utilService.loadingDismiss();
            this.navCtrl.navigateForward('/main/activity/sales-activity');
          }, () => {
            this.utilService.loadingDismiss();
            this.utilService.toast('Update Activity failed !', 'top');
          });
      }      
    })
  }

  edit() {

  }

  base64(image: string) {
    return image.includes('base64') ? image : `data:image/png;base64,${image}`;
  }

  update(item: SalesActivityWithNavigationPropertiesDto) {
    this.service.update(item.salesActivity, item.salesActivity.id)
      .subscribe(() => {
        this.utilService.toast('Update Location Sucess');
      }, (error) => {
        this.utilService.toast('Update Location Failed');
      });
  }

  showImage(name: string, checkIn: boolean) {
    this.service.getPhoto(name)
    .subscribe((photo) => {
      if(checkIn) {
        this.checkInPhoto = this.base64(photo.fileContent);
      } else {
        this.checkOutPhoto = this.base64(photo.fileContent);
      }
    });
  }  

  locationIn(item: SalesActivityWithNavigationPropertiesDto) {    
    if(item.salesActivity.checkInLocation == null) {
      if (this.platform.is('cordova')) {        
        this.getNativeLocation(item, true);
      } else {
        this.getWebLocation(item, true);
      }
    } else {
      this.openMapIn(item);
    }
  }

  locationOut(item: SalesActivityWithNavigationPropertiesDto) {
    if(item.salesActivity.checkOutLocation == null) { 
      if (this.platform.is('cordova')) {
        this.getNativeLocation(item, false);
      } else {
        this.getWebLocation(item, false);
      } 
    } else {
      this.openMapOut(item);
    }
  }

  getNativeLocation(item: SalesActivityWithNavigationPropertiesDto, checkIn: boolean = false) {
    this.utilService.loadingPresent('Please wait.. get location.')
    .then(() => {
      this.geolocation.getCurrentPosition()
      .then((geo) => {
        this.nativeGeocoder.reverseGeocode(geo.coords.latitude, geo.coords.longitude, {
          useLocale: true,
          maxResults: 5
        }).then((geocode: NativeGeocoderResult[]) => {
          this.utilService.loadingDismiss();
          const location = geocode[0];
          const address = `${location.thoroughfare} ${location.subThoroughfare}, ${location.subLocality}, ${location.locality}, 
          ${location.subAdministrativeArea}, ${location.administrativeArea} ${location.postalCode}, 
          ${location.countryName}`;

          if(checkIn) {
            //item.salesActivity.checkinTime = new Date().toISOString();
            item.salesActivity.checkInLocation = address;
            item.salesActivity.checkInLatitude = geo.coords.latitude.toString();
            item.salesActivity.checkInLongitude = geo.coords.longitude.toString();            
          }
          if(!checkIn) {
            //item.salesActivity.checkOutTime = new Date().toISOString();
            item.salesActivity.checkOutLocation = address;
            item.salesActivity.checkOutLatitude = geo.coords.latitude.toString();
            item.salesActivity.checkInLongitude = geo.coords.longitude.toString();   
          }
          this.update(item);
        }).catch(() => {
          this.utilService.loadingDismiss();
          this.utilService.toast('Get location failed, please check your GPS !');
        });
      }).catch(() => {
        this.utilService.loadingDismiss();
        this.utilService.toast('Get location failed, please check your GPS !');
      });
    }).catch(() => {
      this.utilService.loadingDismiss();
      this.utilService.toast('Get location failed, please check your GPS !');
    });
  }

  getWebLocation(item: SalesActivityWithNavigationPropertiesDto, checkIn: boolean) {
    this.utilService.loadingPresent('Please wait.. get location.')
    .then(() => {
      navigator.geolocation.getCurrentPosition((geo) => {
        this.utilService.getWebLocation(geo)
          .subscribe((geocode: any) => {
            this.utilService.loadingDismiss();
            const location = geocode.results[0];
            const address = location.formatted_address;

            if(checkIn) {
              //item.salesActivity.checkinTime = new Date().toISOString();
              item.salesActivity.checkInLocation = address;
              item.salesActivity.checkInLatitude = geo.coords.latitude.toString();
              item.salesActivity.checkInLongitude = geo.coords.longitude.toString();            
            }
            if(!checkIn) {
              //item.salesActivity.checkOutTime = new Date().toISOString();
              item.salesActivity.checkOutLocation = address;
              item.salesActivity.checkOutLatitude = geo.coords.latitude.toString();
              item.salesActivity.checkInLongitude = geo.coords.longitude.toString();   
            }  
            this.update(item);           
          }, () => {
            this.utilService.loadingDismiss();
            this.utilService.toast('Get location failed !');
          });
      }, () => {
        this.utilService.loadingDismiss();
        this.utilService.toast('Get location failed !');
      });
    })
  }

  openMapIn(record: SalesActivityWithNavigationPropertiesDto) {
    return `https://maps.google.com/?q=${record.salesActivity.checkInLatitude},${record.salesActivity.checkInLongitude}`
  }

  openMapOut(record: SalesActivityWithNavigationPropertiesDto) {
    return `https://maps.google.com/?q=${record.salesActivity.checkOutLatitude},${record.salesActivity.checkOutLongitude}`
  }
}
