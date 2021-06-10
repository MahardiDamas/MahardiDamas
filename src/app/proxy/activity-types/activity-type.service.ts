import type { ActivityTypeCreateDto, ActivityTypeDto, ActivityTypeUpdateDto, GetActivityTypesInput } from './models';
import { Injectable } from '@angular/core';
import { HttpService } from '@app/services/http.service';


@Injectable({
  providedIn: 'root',
})
export class ActivityTypeService {
  apiName = 'Default'; 

  constructor(
    private httpService: HttpService
  ) {}

  
}
