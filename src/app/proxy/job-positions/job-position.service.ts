import type { GetJobPositionsInput, JobPositionCreateDto, JobPositionDto, JobPositionUpdateDto } from './models';
import { Injectable } from '@angular/core';
import { HttpService } from '@app/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class JobPositionService {
  apiName = 'Default';

  constructor(
    private httpService: HttpService
  ) {}

  
}
