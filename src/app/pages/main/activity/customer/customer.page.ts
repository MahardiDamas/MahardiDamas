import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from '@environments/environment.prod';
import { EmployeeWithNavigationPropertiesDto } from '@app/proxy/employees';
import { CustomerService, CustomerWithNavigationPropertiesDto, GetCustomersInput } from '@app/proxy/customers';

@Component({
    selector: 'app-customer',
    templateUrl: 'customer.page.html',
    styleUrls: ['./customer.page.scss']
})
export class CustomerPage implements OnInit {

    @Input() employee: EmployeeWithNavigationPropertiesDto;

    customerList: CustomerWithNavigationPropertiesDto[] = [];

    filtersCustomer = { maxResultCount: 10, filterText: '',  sorting: '', companyId: '', employeeId: '' } as GetCustomersInput;

    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    constructor(
        private modalCtrl: ModalController,
        private service: CustomerService,
        private storage: Storage,
    ) {

    } 

    ngOnInit() {
        this.storage.get(`${environment.appName}_roles`)
        .then((roles) => {
            this.setCustomerFilters(roles);            
        });        
    } 

    setCustomerFilters(roles: string[]) {
        this.filtersCustomer.sorting = 'Customer.Code desc';
        if(roles.find((e) => e === 'Head Manager') !== undefined) {
            //no filters
        } else if(roles.find((e) => e === 'Branch Manager') !== undefined) {      
            this.filtersCustomer.companyId = this.employee.employee.companyId;
        } else {
            this.filtersCustomer.employeeId = this.employee.employee.id;;
        } 
        this.getMasterCustomer(null);
      }

    getMasterCustomer(event: any = null, isInit: boolean = true) {
        if(isInit) {
            this.filtersCustomer.skipCount = 0;
            this.customerList = [];
          }
        
        this.service.getCustomer(this.filtersCustomer)
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
        this.getMasterCustomer(event, isInit);
    }

    filterList(event) {
        this.filtersCustomer.filterText = event.srcElement.value;
        if(this.filtersCustomer.filterText.length === 0 || this.filtersCustomer.filterText.length > 3) {
            this.loadData(null);
        }
    }
    
    select(item: string) {
        this.modalCtrl.dismiss({
          'item': item
        });
    }
}