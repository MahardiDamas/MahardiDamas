import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '../shared';

export interface CustomerSegmentCreateDto {
  code?: string;
  name: string;
  description?: string;
}

export interface CustomerSegmentDto extends FullAuditedEntityDto {
  code?: string;
  name: string;
  description?: string;
}

export interface CustomerSegmentUpdateDto {
  code?: string;
  name: string;
  description?: string;
}

export interface GetCustomerSegmentsInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  code?: string;
  name?: string;
  description?: string;
}
