import type { GetWorkshiftsInput, WorkshiftCreateDto, WorkshiftDto, WorkshiftUpdateDto, WorkshiftWithNavigationPropertiesDto } from './models';
import { Injectable } from '@angular/core';
import type { LookupDto, LookupRequestDto } from '../shared/models';
import { HttpService } from '@app/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class WorkshiftService {
  apiName = 'Default'; 

  constructor(
    private httpService: HttpService
  ) {}

  
}

