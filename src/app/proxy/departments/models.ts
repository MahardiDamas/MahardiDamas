import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '../shared';

export interface DepartmentCreateDto {
  code?: string;
  name: string;
  description?: string;
}

export interface DepartmentDto extends FullAuditedEntityDto {
  code?: string;
  name: string;
  description?: string;
}

export interface DepartmentUpdateDto {
  code?: string;
  name: string;
  description?: string;
}

export interface GetDepartmentsInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  code?: string;
  name?: string;
  description?: string;
}
