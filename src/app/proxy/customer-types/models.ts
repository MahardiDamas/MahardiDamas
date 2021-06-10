import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '../shared';

export interface CustomerTypeCreateDto {
  code?: string;
  name: string;
  description?: string;
}

export interface CustomerTypeDto extends FullAuditedEntityDto {
  code?: string;
  name: string;
  description?: string;
}

export interface CustomerTypeUpdateDto {
  code?: string;
  name: string;
  description?: string;
}

export interface GetCustomerTypesInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  code?: string;
  name?: string;
  description?: string;
}
