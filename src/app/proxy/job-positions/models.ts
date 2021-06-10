import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '../shared';

export interface GetJobPositionsInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  code?: string;
  name?: string;
  description?: string;
}

export interface JobPositionCreateDto {
  code?: string;
  name: string;
  description?: string;
}

export interface JobPositionDto extends FullAuditedEntityDto {
  code?: string;
  name: string;
  description?: string;
}

export interface JobPositionUpdateDto {
  code?: string;
  name: string;
  description?: string;
}
