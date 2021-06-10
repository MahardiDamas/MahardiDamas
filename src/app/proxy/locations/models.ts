import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '../shared';
import type { CompanyDto } from '../companies/models';
import type { WorkAreaDto } from '../work-areas/models';

export interface GetLocationsInput extends PagedAndSortedResultRequestDto {
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
  radiusMin?: number;
  radiusMax?: number;
  photo?: string;
  phone1?: string;
  phone2?: string;
  email?: string;
  companyId?: string;
  workAreaId?: string;
}

export interface LocationCreateDto {
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
  radius?: number;
  photo?: string;
  phone1?: string;
  phone2?: string;
  email?: string;
  companyId: string;
  workAreaId: string;
}

export interface LocationDto extends FullAuditedEntityDto {
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
  radius?: number;
  photo?: string;
  phone1?: string;
  phone2?: string;
  email?: string;
  companyId: string;
  workAreaId: string;
}

export interface LocationUpdateDto {
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
  radius?: number;
  photo?: string;
  phone1?: string;
  phone2?: string;
  email?: string;
  companyId: string;
  workAreaId: string;
}

export interface LocationWithNavigationPropertiesDto {
  location: LocationDto;
  company: CompanyDto;
  workArea: WorkAreaDto;
}
