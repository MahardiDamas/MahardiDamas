import type { EntityDto, PagedAndSortedResultRequestDto } from '../shared';

export interface DashboardCreateDto {
  startDate?: string;
  endDate?: string;
  companyId?: string;
  employeeId?: string;
}

export interface DashboardDto extends EntityDto {
  startDate?: string;
  endDate?: string;
  companyId?: string;
  employeeId?: string;
}

export interface DashboardUpdateDto {
  startDate?: string;
  endDate?: string;
  companyId?: string;
  employeeId?: string;
}

export interface GetDashboardsInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  startDate?: string;
  endDate?: string;
  companyId?: string;
  employeeId?: string;  
}

export interface ActivityGroupByTotalDto {
  id?: string;
  name?: string;
  count?: number;
  companyId?: string;
  employeeId?: string;
}
