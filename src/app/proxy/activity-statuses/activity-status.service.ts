import type { ActivityStatusCreateDto, ActivityStatusDto, ActivityStatusUpdateDto, GetActivityStatusesInput } from './models';
import { Injectable } from '@angular/core';
import { HttpService } from '@app/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class ActivityStatusService {
  apiName = 'Default'; 

  constructor(
    private httpService: HttpService
  ) {}

  
}

