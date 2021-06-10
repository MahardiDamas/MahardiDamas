import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from "../shared";

export interface GetWorkAreasInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  code?: string;
  name?: string;
  description?: string;
}

export interface WorkAreaCreateDto {
  code?: string;
  name: string;
  description?: string;
}

export interface WorkAreaDto extends FullAuditedEntityDto {
  code?: string;
  name: string;
  description?: string;
}

export interface WorkAreaUpdateDto {
  code?: string;
  name: string;
  description?: string;
}
