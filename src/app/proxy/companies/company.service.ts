import type { CompanyCreateDto, CompanyDto, CompanyUpdateDto, GetCompaniesInput } from './models';
import { Injectable } from '@angular/core';
import { HttpService } from '@app/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  apiName = 'Default'; 

  constructor(
    private httpService: HttpService
  ) {}

  
}
