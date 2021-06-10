import type { EmployeeWorkshiftCreateDto, EmployeeWorkshiftDto, EmployeeWorkshiftUpdateDto, EmployeeWorkshiftWithNavigationPropertiesDto, GetEmployeeWorkshiftsInput } from './models';
import { Injectable } from '@angular/core';
import type { LookupDto, LookupRequestDto } from '../shared/models';
import { HttpService } from '@app/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeWorkshiftService {
  apiName = 'Default'; 

  constructor(
    private httpService: HttpService
  ) {}

  
}

