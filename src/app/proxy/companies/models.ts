import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '../shared';
import type { CompanyType } from '../shared/company-type.enum';
import type { OfficeType } from '../shared/office-type.enum';

export interface CompanyCreateDto {
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
  companyType?: CompanyType;
  officeType?: OfficeType;
}

export interface CompanyDto extends FullAuditedEntityDto {
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
  companyType?: CompanyType;
  officeType?: OfficeType;
}

export interface CompanyUpdateDto {
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
  companyType?: CompanyType;
  officeType?: OfficeType;
}

export interface GetCompaniesInput extends PagedAndSortedResultRequestDto {
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
  companyType?: CompanyType;
  officeType?: OfficeType;
}
