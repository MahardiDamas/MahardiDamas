import type { CustomerTypeCreateDto, CustomerTypeDto, CustomerTypeUpdateDto, GetCustomerTypesInput } from './models';
import { Injectable } from '@angular/core';
import { HttpService } from '@app/services/http.service';


@Injectable({
  providedIn: 'root',
})
export class CustomerTypeService {
  apiName = 'Default'; 

  constructor(
    private httpService: HttpService
  ) {}

  
}