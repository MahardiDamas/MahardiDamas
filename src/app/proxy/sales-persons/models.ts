import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '../shared';
import type { CompanyDto } from '../companies/models';
import type { EmployeeDto } from '../employees/models';

export interface GetSalesPersonsInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  number?: string;
  joinDateMin?: string;
  joinDateMax?: string;
  name?: string;
  phone?: string;
  email?: string;
  isActive?: boolean;
  companyId?: string;
  employeeId?: string;
}

export interface SalesPersonCreateDto {
  number?: string;
  joinDate?: string;
  name?: string;
  phone?: string;
  email?: string;
  isActive?: boolean;
  companyId: string;
  employeeId: string;
}

export interface SalesPersonDto extends FullAuditedEntityDto {
  number?: string;
  joinDate?: string;
  name?: string;
  phone?: string;
  email?: string;
  isActive?: boolean;
  companyId: string;
  employeeId: string;
}

export interface SalesPersonUpdateDto {
  number?: string;
  joinDate?: string;
  name?: string;
  phone?: string;
  email?: string;
  isActive?: boolean;
  companyId: string;
  employeeId: string;
}

export interface SalesPersonWithNavigationPropertiesDto {
  salesPerson: SalesPersonDto;
  company: CompanyDto;
  employee: EmployeeDto;
}
