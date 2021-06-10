import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { UtilService } from '@app/services/util.service';
import { NavController, Platform } from '@ionic/angular';
import { environment } from '@environments/environment.prod';
import { Storage } from '@ionic/storage';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { NativeGeocoder, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { IonInfiniteScroll } from '@ionic/angular';
import * as moment from 'moment';
import { EmployeeWithNavigationPropertiesDto } from '@app/proxy/employees';
import { GetSalesActivitiesInput, SalesActivityService, SalesActivityWithNavigationPropertiesDto } from '@app/proxy/sales-activities';
import { GetSalesPersonsInput, SalesPersonService, SalesPersonWithNavigationPropertiesDto } from '@app/proxy/sales-persons';
import { CustomerService, CustomerWithNavigationPropertiesDto, GetCustomersInput } from '@app/proxy/customers';

@Component({
  selector: 'app-sales-activity',
  templateUrl: './sales-activity.page.html',
  styleUrls: ['./sales-activity.page.scss'],
})
export class SalesActivityPage implements OnInit {

  title: string = null;

  isActivity: boolean = true;

  activity: string = 'today';

  master: string = 'sales-person';

  today: Date = new Date();

  employee: EmployeeWithNavigationPropertiesDto;  

  activityTodayList: SalesActivityWithNavigationPropertiesDto[] = [];

  activityPlanList: SalesActivityWithNavigationPropertiesDto[] = [];

  activityHistoryList: SalesActivityWithNavigationPropertiesDto[] = [];

  salesPersonList: SalesPersonWithNavigationPropertiesDto[] = [];

  customerList: CustomerWithNavigationPropertiesDto[] = [];

  filters = { maxResultCount: 10, filterText: '', sorting: '', companyId: '', employeeId: ''} as GetSalesActivitiesInput;

  filtersSalesPerson = { maxResultCount: 10, filterText: '', employeeId: '', sorting: '' } as GetSalesPersonsInput;

  filtersCustomer = { maxResultCount: 10, filterText: '', companyId: '', employeeId: ''} as GetCustomersInput;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  roles: string[] = [];

  constructor(
    private navCtrl: NavController,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private service: SalesActivityService,
    private salesPersonService: SalesPersonService,
    private customerService: CustomerService,
    private utilService: UtilService,
    private storage: Storage,
    // private geolocation: Geolocation,
    // private nativeGeocoder: NativeGeocoder,
    // private platform: Platform,
    private camera: Camera
  ) {

  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      this.title = params.title; 
    });
  }

  ionViewWillEnter() {
    Promise.all([
      this.storage.get(`${environment.appName}_employee`),
      this.storage.get(`${environment.appName}_roles`)
    ]).then(([employee, roles]) => { 
      this.roles = roles;
      this.employee = employee;
      this.loadData(null);
    });
  }
  
  switchView() {
    this.isActivity = this.isActivity ? false : true;
    if(!this.isActivity) {
      this.getSalesPerson();
    }
  }

  setActivityFilters() {
    if(this.roles.find((e) => e === 'Head Manager') !== undefined) {
        //no filters
    } else if(this.roles.find((e) => e === 'Branch Manager') !== undefined) {      
        this.filters.companyId = this.employee.employee.companyId;
    } else {
        this.filters.employeeId = this.employee.employee.id;
    } 
  }

  setSalesPersonFilters() {
    this.filtersSalesPerson.sorting = 'SalesPerson.Number asc';
    if(this.roles.find((e) => e === 'Head Manager') !== undefined) {
        //no filters
    } else if(this.roles.find((e) => e === 'Branch Manager') !== undefined) {      
      this.filtersSalesPerson.companyId = this.employee.employee.companyId;
    } else {
        this.filtersSalesPerson.employeeId = this.employee.employee.id;
    }
  }

  setCustomerFilters() {
    this.filtersCustomer.sorting = 'Customer.Code desc';
    if(this.roles.find((e) => e === 'Head Manager') !== undefined) {
      //no filters
    } else if(this.roles.find((e) => e === 'Branch Manager') !== undefined) {      
      this.filtersCustomer.companyId = this.employee.employee.companyId;
    } else {
      this.filtersCustomer.employeeId = this.employee.employee.id;
    } 
  }

  getActivityToday(event: any = null, isInit: boolean = true) {
    if(isInit) {
      this.filters.skipCount = 0;
      this.activityTodayList = [];
    } 
    this.setActivityFilters();
    this.filters.planDateTimeMax = moment().endOf('date').toISOString();
    this.filters.planDateTimeMin = moment().subtract(1, 'days').endOf('date').toISOString();         
    this.service.getByEmployeeId(this.filters)
      .subscribe((data) => {        
        data.items.forEach((item: SalesActivityWithNavigationPropertiesDto) => {
          this.activityTodayList.push(item);
        });
        
        if(!isInit) {
          event.target.complete();
        }     
          
        this.filters.skipCount = this.filters.skipCount + this.filters.maxResultCount;
      });
  }

  getActivityPlan(event: any = null, isInit: boolean = true) {
    if(isInit) {
      this.filters.skipCount = 0;
      this.activityPlanList = [];
    }
    this.setActivityFilters();
    this.filters.planDateTimeMin = moment().add(0, 'days').endOf('date').toISOString(),  
    this.filters.planDateTimeMax = '';  
    this.service.getByEmployeeId(this.filters)
    .subscribe((data) => {
      data.items.forEach((item: SalesActivityWithNavigationPropertiesDto) => {
        this.activityPlanList.push(item);
      });

      if(!isInit) {
        event.target.complete();
      }     
        
      this.filters.skipCount = this.filters.skipCount + this.filters.maxResultCount;
    });
  }

  getActivityHistory(event: any = null, isInit: boolean = true) {
    if(isInit) {
      this.filters.skipCount = 0;
      this.activityHistoryList = [];
    }
    this.setActivityFilters();
    this.filters.planDateTimeMin = '';
    this.filters.planDateTimeMax = moment().subtract(1, 'days').endOf('date').toISOString();  
    this.filters.sorting = 'SalesActivity.CheckinTime desc';   
    this.service.getByEmployeeId(this.filters)
    .subscribe((data) => {
      data.items.forEach((item: SalesActivityWithNavigationPropertiesDto) => {
        this.activityHistoryList.push(item);
      });
      
      if(!isInit) {
        event.target.complete();
      }     
        
      this.filters.skipCount = this.filters.skipCount + this.filters.maxResultCount;
    });
  }

  getSalesPerson(event: any = null, isInit: boolean = true) {
    if(isInit) {
        this.filtersSalesPerson.skipCount = 0;
        this.salesPersonList = [];
      }
    this.setSalesPersonFilters();
    this.salesPersonService.get(this.filtersSalesPerson)
    .subscribe((data) => {
        data.items.forEach((item: SalesPersonWithNavigationPropertiesDto) => {
            this.salesPersonList.push(item);
        });
        
        if(!isInit) {
            event.target.complete();
        }     
        
        this.filtersSalesPerson.skipCount = this.filtersSalesPerson.skipCount + this.filtersSalesPerson.maxResultCount;
    });
  }

  getMasterCustomer(event: any = null, isInit: boolean = true) {
    if(isInit) {
      this.filtersCustomer.skipCount = 0;
      this.customerList = [];
    }
    this.setCustomerFilters();
    this.customerService.getCustomer(this.filtersCustomer)
      .subscribe((data) => {
        data.items.forEach((item: CustomerWithNavigationPropertiesDto) => {
          this.customerList.push(item);
        });
        
        if(!isInit) {
          event.target.complete();
        }     
          
        this.filtersCustomer.skipCount = this.filtersCustomer.skipCount + this.filtersCustomer.maxResultCount;
      });
  }

  loadData(event: any, isInit: boolean = true) {
    if(this.isActivity) {
      switch (this.activity) {
        case 'today':
          this.getActivityToday(event, isInit);
          break;
        case 'plan':
          this.getActivityPlan(event, isInit);
          break;
        case 'history':
          this.getActivityHistory(event, isInit);
            break;
        default:
          break;
      }
    } else {
      switch (this.master) {
        case 'sales-person':
          this.getSalesPerson(event, isInit);
          break;
        case 'customer':
          this.getMasterCustomer(event, isInit);
          break;
      
        default:
          break;
      }
    }   
  }

  filterList(event) {
    if(this.isActivity) {
      this.filters.filterText = event.srcElement.value;
      if(this.filters.filterText.length === 0 || this.filters.filterText.length > 3) {
        this.loadData(null);
      }
    }

    if(!this.isActivity) {
      switch (this.master) {
        case 'sales-person':
          this.filtersSalesPerson.filterText = event.srcElement.value;
          if(this.filtersSalesPerson.filterText.length === 0 || this.filtersSalesPerson.filterText.length > 3) {
            this.loadData(null);
          }
          break;
        case 'customer':
          this.filtersCustomer.filterText = event.srcElement.value;
          if(this.filtersCustomer.filterText.length === 0 || this.filtersCustomer.filterText.length > 3) {
            this.loadData(null);
          }
          break;      
        default:
          break;
      }      
    }    
  }

  add(isActivity: boolean) {
    if(isActivity) {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          pageType: 'new',
          title: 'New Activity',
          data: null,
          employee: this.employee
        }
      }
      this.navCtrl.navigateForward('/main/activity/sales-activity/sales-activity-detail', navigationExtras);
    } else {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          pageType: 'new',
          title: 'New Customer',
          data: null,
          employee: this.employee
        }
      }
      this.navCtrl.navigateForward('/main/activity/sales-activity/customer-detail', navigationExtras);
    }
  }

  editActivity(item: SalesActivityWithNavigationPropertiesDto) {
    console.log(item);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        pageType: 'edit',
        title: 'Edit Activity',
        data: item,
        employee: this.employee
      }
    }
    this.navCtrl.navigateForward('/main/activity/sales-activity/sales-activity-detail', navigationExtras);    
  }

  editSalesPerson(item: SalesPersonWithNavigationPropertiesDto) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        pageType: 'edit',
        title: 'Overview',
        data: item,
        employee: this.employee
      }
    }
    this.navCtrl.navigateForward('/main/activity/sales-activity/sales-person-detail', navigationExtras); 
  }

  editCustomer(item: CustomerWithNavigationPropertiesDto) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        pageType: 'edit',
        title: 'Edit Customer',
        data: item,
        employee: this.employee
      }
    }
    this.navCtrl.navigateForward('/main/activity/sales-activity/customer-detail', navigationExtras); 
  }

  update(item: SalesActivityWithNavigationPropertiesDto) {
    this.service.update(item.salesActivity, item.salesActivity.id)
      .subscribe(() => {
        this.utilService.toast('Update Location/ Photo Check Out Sucess');
      }, (error) => {
        this.utilService.toast('Update Location/ Photo Check Out Failed');
      });
  }

  checkIn(item: SalesActivityWithNavigationPropertiesDto) {   
    if(item.salesActivity.checkinTime === null) {
      item.salesActivity.checkinTime = new Date().toISOString();
      item.salesActivity.timezoneInfoIn = this.utilService.timezoneInfo();
      item.salesActivity.timezoneOffsetIn = this.utilService.timezoneOffset();
      this.update(item);
    } else {
      this.getPhoto(item, true);
    }
    // if(item.salesActivity.checkInLocation == null) {
    //   if (this.platform.is('cordova')) {        
    //     this.getNativeLocation(item, true);
    //   } else {
    //     this.getWebLocation(item, true);
    //   }
    // } else {
    //   this.getPhoto(item, true);
    // } 
  }

  checkOut(item: SalesActivityWithNavigationPropertiesDto) {
    if(item.salesActivity.checkOutTime === null) {
      item.salesActivity.checkOutTime = new Date().toISOString();
      item.salesActivity.timezoneInfoOut = this.utilService.timezoneInfo();
      item.salesActivity.timezoneOffsetOut = this.utilService.timezoneOffset();
      this.update(item);
    } else {
      this.getPhoto(item, false);
    }
    // if(item.salesActivity.checkOutLocation == null) { 
    //   if (this.platform.is('cordova')) {
    //     this.getNativeLocation(item, false);
    //   } else {
    //     this.getWebLocation(item, false);
    //   } 
    // } else {
    //   this.getPhoto(item, false);
    // } 
  }  

  getPhoto(item: SalesActivityWithNavigationPropertiesDto, checkIn: boolean) {
    const options: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: false,
      allowEdit: false,
      targetWidth: 350,
      targetHeight: 350,
      correctOrientation: true,
      cameraDirection: 1
    }

    this.camera.getPicture(options).then((imageData) => {
      if(checkIn) { 
        const name = `${item.salesActivity.id}_checkin`;
        this.service.createPhoto({
          id: item.salesActivity.id, 
          name: name,
          fileContent: imageData
        }).subscribe((data) => {
          item.salesActivity.checkInPhoto = data.name;
          this.update(item);
        }, (error) => {
          this.utilService.toast('Save photo failed !', error);
        });        
      }
      if(!checkIn) {
        const name = `${item.salesActivity.id}_checkout`;
        this.service.createPhoto({
          id: item.salesActivity.id, 
          name: name,
          fileContent: imageData
        }).subscribe((data) => {
          item.salesActivity.checkOutPhoto = data.name;
          this.update(item);
        }, (error) => {
          this.utilService.toast('Save photo failed !', error);
        }); 
      }
      
    }, (error) => {
      this.utilService.toast('Get photo failed !', error);
    });
  }  

}
