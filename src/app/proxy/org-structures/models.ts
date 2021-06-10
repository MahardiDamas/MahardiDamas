import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '../shared';
import type { CompanyDto } from '../companies/models';
import type { DepartmentDto } from '../departments/models';
import type { JobPositionDto } from '../job-positions/models';

export interface GetOrgStructuresInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  code?: string;
  name?: string;
  description?: string;
  isDepartment?: boolean;
  parentId?: string;
  companyId?: string;
  departmentId?: string;
  jobPositionId?: string;
}

export interface OrgStructureCreateDto {
  code?: string;
  name: string;
  description?: string;
  isDepartment?: boolean;
  parentId?: string;
  companyId: string;
  departmentId?: string;
  jobPositionId?: string;
}

export interface OrgStructureDto extends FullAuditedEntityDto {
  code?: string;
  name: string;
  description?: string;
  isDepartment?: boolean;
  parentId?: string;
  companyId: string;
  departmentId?: string;
  jobPositionId?: string;
}

export interface OrgStructureUpdateDto {
  code?: string;
  name: string;
  description?: string;
  isDepartment?: boolean;
  parentId?: string;
  companyId: string;
  departmentId?: string;
  jobPositionId?: string;
}

export interface OrgStructureWithNavigationPropertiesDto {
  orgStructure: OrgStructureDto;
  company: CompanyDto;
  department: DepartmentDto;
  jobPosition: JobPositionDto;
}
