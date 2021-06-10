import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '@app/services/util.service';
import { NavController } from '@ionic/angular';
import { CustomerService, CustomerWithNavigationPropertiesDto } from '@app/proxy/customers';
import { EmployeeWithNavigationPropertiesDto } from '@app/proxy/employees';
import { zip } from 'rxjs';
import { LookupDto, PagedResultDto } from '@app/proxy/shared';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.page.html',
  styleUrls: ['./customer-detail.page.scss'],
})
export class CustomerDetailPage implements OnInit {

  title: string = null;

  form: FormGroup;

  selected?: CustomerWithNavigationPropertiesDto = null;

  employee: EmployeeWithNavigationPropertiesDto;

  customerTypeList: PagedResultDto<LookupDto> = {
    items: [],
    totalCount: 0,
  };

  customerSegmentList: PagedResultDto<LookupDto> = {
    items: [],
    totalCount: 0,
  };

  constructor(
    private activeRoute: ActivatedRoute,
    private navCtrl: NavController,
    private fb: FormBuilder,
    private utilService: UtilService,
    private service: CustomerService,
    private translate: TranslateService
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
      this.service.getCustomerTypeLookup(),
      this.service.getCustomerSegmentLookup()      
    )
    source$.subscribe(([type, segment]) => {
      this.customerTypeList = type;
      this.customerSegmentList = segment;
    });    
  }

  ionViewWillEnter() {
    
  }

  buildForm() {
    const {
      code,
      name,
      description,
      address,
      country,
      province,
      city,
      district,
      village,
      postal,
      latitude,
      longitude,
      phone1,
      phone2,
      email,
      website,
      photo,
      logo,
      pic,
      picPhone,
      picEmail,
      companyId,
      employeeId,
      customerSegmentId,
      customerTypeId,
    } = this.selected?.customer || {};

    this.form = this.fb.group({
      code: [code ?? null, []],
      name: [name ?? null, [Validators.required]],
      description: [description ?? null, []],
      address: [address ?? null, []],
      country: [country ?? null, []],
      province: [province ?? null, []],
      city: [city ?? null, []],
      district: [district ?? null, []],
      village: [village ?? null, []],
      postal: [postal ?? null, []],
      latitude: [latitude ?? null, []],
      longitude: [longitude ?? null, []],
      phone1: [phone1 ?? null, []],
      phone2: [phone2 ?? null, []],
      email: [email ?? null, []],
      website: [website ?? null, []],
      photo: [photo ?? null, []],
      logo: [logo ?? null, []],
      pic: [pic ?? null, []],
      picPhone: [picPhone ?? null, []],
      picEmail: [picEmail ?? null, [Validators.email]],
      companyId: [companyId ?? null, []],
      employeeId: [employeeId ?? null, []],
      customerSegmentId: [customerSegmentId ?? null, [Validators.required]],
      customerTypeId: [customerTypeId ?? null, [Validators.required]],
    });
  }

  create() {
    if (this.form.invalid) {
      return;
    }

    this.form.patchValue({ companyId: this.employee.company.id });    
    this.form.patchValue({ employeeId: this.employee.employee.id });

    this.utilService.loadingPresent('Please wait...')
    .then(() => {
      if(this.selected === null) {
        this.service.add(this.form.value)
        .subscribe(() => {
          this.utilService.loadingDismiss();
          this.navCtrl.navigateForward('/main/activity/sales-activity');
        }, () => {
          this.utilService.loadingDismiss();
          this.utilService.toast('Create Customer failed !', 'top');
        });
      } else {
        this.service.update(this.form.value, this.selected.customer.id)
          .subscribe(() => {
            this.utilService.loadingDismiss();
            this.navCtrl.navigateForward('/main/activity/sales-activity');
          }, () => {
            this.utilService.loadingDismiss();
            this.utilService.toast('Update Customer failed !', 'top');
          });
      }      
    })
  }

  l(name: string): any {
    this.translate.get(name).subscribe((t) => {
      return t;
    });
  }

}
