import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '../shared';

export interface EducationCreateDto {
  code?: string;
  name: string;
  description?: string;
}

export interface EducationDto extends FullAuditedEntityDto {
  code?: string;
  name: string;
  description?: string;
}

export interface EducationUpdateDto {
  code?: string;
  name: string;
  description?: string;
}

export interface GetEducationsInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  code?: string;
  name?: string;
  description?: string;
}
