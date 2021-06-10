import type { CustomerSegmentCreateDto, CustomerSegmentDto, CustomerSegmentUpdateDto, GetCustomerSegmentsInput } from './models';
import { Injectable } from '@angular/core';
import { HttpService } from '@app/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerSegmentService {
  apiName = 'Default'; 

  constructor(
    private httpService: HttpService
  ) {}

  
}

