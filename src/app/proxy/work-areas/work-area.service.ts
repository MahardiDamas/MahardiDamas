import type { GetWorkAreasInput, WorkAreaCreateDto, WorkAreaDto, WorkAreaUpdateDto } from './models';
import { Injectable } from '@angular/core';
import { HttpService } from '@app/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class WorkAreaService {
  apiName = 'Default'; 

  constructor(
    private httpService: HttpService
  ) {}

  
}
