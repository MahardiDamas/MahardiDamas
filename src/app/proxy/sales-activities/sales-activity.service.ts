import type { GetSalesActivitiesInput, SalesActivityCreateDto, SalesActivityDto, SalesActivityUpdateDto, SalesActivityWithNavigationPropertiesDto } from './models';
import { Injectable } from '@angular/core';
import type { ImageDto, LookupDto, LookupRequestDto } from '../shared/models';
import { HttpService } from '@app/services/http.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class SalesActivityService {
  apiName = 'Default'; 

  constructor(
    private httpService: HttpService
  ) {}

  add(data: SalesActivityCreateDto): Observable<any> {
    return this.httpService.post('/api/app/sales-activities', data);
  }

  update(data: SalesActivityCreateDto, id: string): Observable<any> {
    return this.httpService.put(`/api/app/sales-activities/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.httpService.delete(`/api/app/sales-activities/${id}`);
  }

  getByEmployeeId(input: GetSalesActivitiesInput): Observable<any> {
    return this.httpService.get(`/api/app/sales-activities?CompanyId=${input.companyId}&EmployeeId=${input.employeeId}&PlanDateTimeMin=${input.planDateTimeMin}&PlanDateTimeMax=${input.planDateTimeMax}&FilterText=${input.filterText}&MaxResultCount=${input.maxResultCount}&SkipCount=${input.skipCount}&Sorting=${input.sorting}`);
  }

  getByIdWithNavigationProperties(id: string): Observable<any> {
    return this.httpService.get(`/api/app/sales-activities/with-navigation-properties/${id}`);
  }    

  getActivityCategoryLookup(maxResultCount: number = 10, skipCount: number = 0): Observable<any> {
    return this.httpService.get(`/api/app/sales-activities/activity-category-lookup?MaxResultCount=${maxResultCount}&SkipCount=${skipCount}`);
  }

  getActivityTypeLookup(maxResultCount: number = 10, skipCount: number = 0): Observable<any> {
    return this.httpService.get(`/api/app/sales-activities/activity-type-lookup?MaxResultCount=${maxResultCount}&SkipCount=${skipCount}`);
  }

  getActivityStatusLookup(maxResultCount: number = 10, skipCount: number = 0): Observable<any> {
    return this.httpService.get(`/api/app/sales-activities/activity-status-lookup?MaxResultCount=${maxResultCount}&SkipCount=${skipCount}`);
  }

  createPhoto(photo: ImageDto): Observable<ImageDto> {
      return this.httpService.post(`/api/app/images/sales-activity-photo`, photo);
  }

  getPhoto(name: string): Observable<ImageDto> {
      return this.httpService.get(`/api/app/images/sales-activity/${name}`);
  }
  
}