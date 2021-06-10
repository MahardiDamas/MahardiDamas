import type { EducationCreateDto, EducationDto, EducationUpdateDto, GetEducationsInput } from './models';
import { Injectable } from '@angular/core';
import { HttpService } from '@app/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  apiName = 'Default';

  constructor(
    private httpService: HttpService
  ) {}

  
}
