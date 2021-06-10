import type { GetLocationsInput, LocationCreateDto, LocationDto, LocationUpdateDto, LocationWithNavigationPropertiesDto } from './models';
import { Injectable } from '@angular/core';
import type { LookupDto, LookupRequestDto } from '../shared/models';
import { HttpService } from '@app/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  apiName = 'Default';

  constructor(
    private httpService: HttpService
  ) {}

  
}
