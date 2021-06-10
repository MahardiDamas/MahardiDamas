import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '../shared';

export interface ActivityTypeCreateDto {
  code?: string;
  name: string;
  description?: string;
  inOffice?: boolean;
}

export interface ActivityTypeDto extends FullAuditedEntityDto {
  code?: string;
  name: string;
  description?: string;
  inOffice?: boolean;
}

export interface ActivityTypeUpdateDto {
  code?: string;
  name: string;
  description?: string;
  inOffice?: boolean;
}

export interface GetActivityTypesInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  code?: string;
  name?: string;
  description?: string;
  inOffice?: boolean;
}
