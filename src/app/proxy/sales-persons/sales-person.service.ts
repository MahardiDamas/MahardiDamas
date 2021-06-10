import type { GetSalesPersonsInput, SalesPersonCreateDto, SalesPersonDto, SalesPersonUpdateDto, SalesPersonWithNavigationPropertiesDto } from './models';
import { Injectable } from '@angular/core';
import type { LookupDto, LookupRequestDto } from '../shared/models';
import { HttpService } from '@app/services/http.service';
import { Observable } from 'rxjs';
import { CustomerCreateDto, CustomerUpdateDto } from '../customers';

@Injectable({
  providedIn: 'root',
})
export class SalesPersonService {
  apiName = 'Default'; 

  constructor(
    private httpService: HttpService
  ) {}

  get(input: GetSalesPersonsInput): Observable<any> {
      return this.httpService.get(`/api/app/sales-persons?EmployeeId=${input.employeeId}&FilterText=${input.filterText}&MaxResultCount=${input.maxResultCount}&SkipCount=${input.skipCount}&Sorting=${input.sorting}`);
  }
}
