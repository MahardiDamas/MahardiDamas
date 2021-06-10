import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '../shared';
import type { CompanyDto } from '../companies/models';
import type { EmployeeDto } from '../employees/models';
import type { CustomerSegmentDto } from '../customer-segments/models';
import type { CustomerTypeDto } from '../customer-types/models';

export interface CustomerCreateDto {
  code?: string;
  name: string;
  description?: string;
  address?: string;
  country?: string;
  province?: string;
  city?: string;
  district?: string;
  village?: string;
  postal?: string;
  latitude?: string;
  longitude?: string;
  phone1?: string;
  phone2?: string;
  email?: string;
  website?: string;
  photo?: string;
  logo?: string;
  pic?: string;
  picPhone?: string;
  picEmail?: string;
  companyId?: string;
  employeeId?: string;
  customerSegmentId: string;
  customerTypeId: string;
}

export interface CustomerDto extends FullAuditedEntityDto {
  code?: string;
  name: string;
  description?: string;
  address?: string;
  country?: string;
  province?: string;
  city?: string;
  district?: string;
  village?: string;
  postal?: string;
  latitude?: string;
  longitude?: string;
  phone1?: string;
  phone2?: string;
  email?: string;
  website?: string;
  photo?: string;
  logo?: string;
  pic?: string;
  picPhone?: string;
  picEmail?: string;
  companyId?: string;
  employeeId?: string;
  customerSegmentId: string;
  customerTypeId: string;
}

export interface CustomerUpdateDto {
  code?: string;
  name: string;
  description?: string;
  address?: string;
  country?: string;
  province?: string;
  city?: string;
  district?: string;
  village?: string;
  postal?: string;
  latitude?: string;
  longitude?: string;
  phone1?: string;
  phone2?: string;
  email?: string;
  website?: string;
  photo?: string;
  logo?: string;
  pic?: string;
  picPhone?: string;
  picEmail?: string;
  companyId?: string;
  employeeId?: string;
  customerSegmentId: string;
  customerTypeId: string;
}

export interface CustomerWithNavigationPropertiesDto {
  customer: CustomerDto;
  company: CompanyDto;
  employee: EmployeeDto;
  customerSegment: CustomerSegmentDto;
  customerType: CustomerTypeDto;
}

export interface GetCustomersInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  code?: string;
  name?: string;
  description?: string;
  address?: string;
  country?: string;
  province?: string;
  city?: string;
  district?: string;
  village?: string;
  postal?: string;
  latitude?: string;
  longitude?: string;
  phone1?: string;
  phone2?: string;
  email?: string;
  website?: string;
  photo?: string;
  logo?: string;
  pic?: string;
  picPhone?: string;
  picEmail?: string;
  companyId?: string;
  employeeId?: string;
  customerSegmentId?: string;
  customerTypeId?: string;
}
