import type { DepartmentCreateDto, DepartmentDto, DepartmentUpdateDto, GetDepartmentsInput } from './models';
import { Injectable } from '@angular/core';
import { HttpService } from '@app/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  apiName = 'Default';

  constructor(
    private httpService: HttpService
  ) {}

  
}
