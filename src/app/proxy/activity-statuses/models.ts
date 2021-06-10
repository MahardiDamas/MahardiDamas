import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '../shared';

export interface ActivityStatusCreateDto {
  code?: string;
  name: string;
  description?: string;
}

export interface ActivityStatusDto extends FullAuditedEntityDto {
  code?: string;
  name: string;
  description?: string;
}

export interface ActivityStatusUpdateDto {
  code?: string;
  name: string;
  description?: string;
}

export interface GetActivityStatusesInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  code?: string;
  name?: string;
  description?: string;
}
