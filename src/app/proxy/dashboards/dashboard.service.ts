import type { ActivityGroupByTotalDto, DashboardCreateDto, DashboardDto, DashboardUpdateDto, GetDashboardsInput } from './models';
import { Injectable } from '@angular/core';
import { HttpService } from '@app/services/http.service';
import { Observable } from 'rxjs';
import { PagedResultDto } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  apiName = 'Default'; 

  constructor(
    private httpService: HttpService
  ) {}

  getSalesActivityByCustomer(input: GetDashboardsInput): Observable<PagedResultDto<ActivityGroupByTotalDto>> {
    return this.httpService.get(`/api/app/dashboards/sales-activity-by-customer?CompanyId=${input.companyId}&EmployeeId=${input.employeeId}&StartDate=${input.startDate}&EndDate=${input.endDate}`);
  }

  getSalesActivityByCustomerSegment(input: GetDashboardsInput): Observable<PagedResultDto<ActivityGroupByTotalDto>> {
    return this.httpService.get(`/api/app/dashboards/sales-activity-by-customer-segment?CompanyId=${input.companyId}&EmployeeId=${input.employeeId}&StartDate=${input.startDate}&EndDate=${input.endDate}`);
  }

  getSalesActivityByType(input: GetDashboardsInput): Observable<PagedResultDto<ActivityGroupByTotalDto>> {
    return this.httpService.get(`/api/app/dashboards/sales-activity-by-type?CompanyId=${input.companyId}&EmployeeId=${input.employeeId}&StartDate=${input.startDate}&EndDate=${input.endDate}`);
  }

  getSalesActivityByStatus(input: GetDashboardsInput): Observable<PagedResultDto<ActivityGroupByTotalDto>> {
    return this.httpService.get(`/api/app/dashboards/sales-activity-by-status?CompanyId=${input.companyId}&EmployeeId=${input.employeeId}&StartDate=${input.startDate}&EndDate=${input.endDate}`);
  }

  getSalesActivityByAvgTotalTime(input: GetDashboardsInput): Observable<PagedResultDto<ActivityGroupByTotalDto>> {
    return this.httpService.get(`/api/app/dashboards/sales-activity-by-avg-total-time?CompanyId=${input.companyId}&EmployeeId=${input.employeeId}&StartDate=${input.startDate}&EndDate=${input.endDate}`);
  }
}
