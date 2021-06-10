import type { CustomerCreateDto, CustomerUpdateDto, GetCustomersInput } from './models';
import { Injectable } from '@angular/core';
import { HttpService } from '@app/services/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiName = 'Default'; 

  constructor(
    private httpService: HttpService
  ) {}

  add(data: CustomerCreateDto): Observable<any> {
    return this.httpService.post('/api/app/customers', data);
  }

  update(data: CustomerUpdateDto, id: string): Observable<any> {
      return this.httpService.put(`/api/app/customers/${id}`, data);
  }

  delete(id: string): Observable<any> {
      return this.httpService.delete(`/api/app/customers/${id}`);
  }

  getCustomer(input: GetCustomersInput): Observable<any> {
      return this.httpService.get(`/api/app/customers?CompanyId=${input.companyId}&EmployeeId=${input.employeeId}&FilterText=${input.filterText}&MaxResultCount=${input.maxResultCount}&SkipCount=${input.skipCount}&Sorting=${input.sorting}`);
  }

  getCustomerSegmentLookup(maxResultCount: number = 100, skipCount: number = 0): Observable<any> {
      return this.httpService.get(`/api/app/customers/customer-segment-lookup?MaxResultCount=${maxResultCount}&SkipCount=${skipCount}`);
  }

  getCustomerTypeLookup(maxResultCount: number = 100, skipCount: number = 0): Observable<any> {
    return this.httpService.get(`/api/app/customers/customer-type-lookup?MaxResultCount=${maxResultCount}&SkipCount=${skipCount}`);
  }
  
}
