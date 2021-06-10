import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from "../shared";
import type { CompanyDto } from '../companies/models';

export interface GetWorkshiftsInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  code?: string;
  name?: string;
  description?: string;
  workTimeInMin?: string;
  workTimeInMax?: string;
  clockInStartMin?: string;
  clockInStartMax?: string;
  clockInEndMin?: string;
  clockInEndMax?: string;
  clockInLatitude?: string;
  clockInLongitude?: string;
  clockInRadiusMin?: number;
  clockInRadiusMax?: number;
  workTimeOutMin?: string;
  workTimeOutMax?: string;
  clockOutStartMin?: string;
  clockOutStartMax?: string;
  clockOutEndMin?: string;
  clockOutEndMax?: string;
  clockOutLatitude?: string;
  clockOutLongitude?: string;
  clockOutRadiusMin?: number;
  clockOutRadiusMax?: number;
  breakTimeStart1Min?: string;
  breakTimeStart1Max?: string;
  breakTimeEnd1Min?: string;
  breakTimeEnd1Max?: string;
  breakTimeStart2Min?: string;
  breakTimeStart2Max?: string;
  breakTimeEnd2Min?: string;
  breakTimeEnd2Max?: string;
  overtimeStartMin?: string;
  overtimeStartMax?: string;
  overtimeEndMin?: string;
  overtimeEndMax?: string;
  totalBreakTime1Min?: number;
  totalBreakTime1Max?: number;
  totalBreakTime2Min?: number;
  totalBreakTime2Max?: number;
  totalWorkingHoursMin?: number;
  totalWorkingHoursMax?: number;
  totalOvertimeMin?: number;
  totalOvertimeMax?: number;
  isDefault?: boolean;
  isActive?: boolean;
  indexMin?: number;
  indexMax?: number;
  companyId?: string;
}

export interface WorkshiftCreateDto {
  code?: string;
  name: string;
  description?: string;
  workTimeIn?: string;
  clockInStart?: string;
  clockInEnd?: string;
  clockInLatitude?: string;
  clockInLongitude?: string;
  clockInRadius?: number;
  workTimeOut?: string;
  clockOutStart?: string;
  clockOutEnd?: string;
  clockOutLatitude?: string;
  clockOutLongitude?: string;
  clockOutRadius?: number;
  breakTimeStart1?: string;
  breakTimeEnd1?: string;
  breakTimeStart2?: string;
  breakTimeEnd2?: string;
  overtimeStart?: string;
  overtimeEnd?: string;
  totalBreakTime1?: number;
  totalBreakTime2?: number;
  totalWorkingHours?: number;
  totalOvertime?: number;
  isDefault?: boolean;
  isActive?: boolean;
  index?: number;
  companyId?: string;
}

export interface WorkshiftDto extends FullAuditedEntityDto {
  code?: string;
  name: string;
  description?: string;
  workTimeIn?: string;
  clockInStart?: string;
  clockInEnd?: string;
  clockInLatitude?: string;
  clockInLongitude?: string;
  clockInRadius?: number;
  workTimeOut?: string;
  clockOutStart?: string;
  clockOutEnd?: string;
  clockOutLatitude?: string;
  clockOutLongitude?: string;
  clockOutRadius?: number;
  breakTimeStart1?: string;
  breakTimeEnd1?: string;
  breakTimeStart2?: string;
  breakTimeEnd2?: string;
  overtimeStart?: string;
  overtimeEnd?: string;
  totalBreakTime1?: number;
  totalBreakTime2?: number;
  totalWorkingHours?: number;
  totalOvertime?: number;
  isDefault?: boolean;
  isActive?: boolean;
  index?: number;
  companyId?: string;
}

export interface WorkshiftUpdateDto {
  code?: string;
  name: string;
  description?: string;
  workTimeIn?: string;
  clockInStart?: string;
  clockInEnd?: string;
  clockInLatitude?: string;
  clockInLongitude?: string;
  clockInRadius?: number;
  workTimeOut?: string;
  clockOutStart?: string;
  clockOutEnd?: string;
  clockOutLatitude?: string;
  clockOutLongitude?: string;
  clockOutRadius?: number;
  breakTimeStart1?: string;
  breakTimeEnd1?: string;
  breakTimeStart2?: string;
  breakTimeEnd2?: string;
  overtimeStart?: string;
  overtimeEnd?: string;
  totalBreakTime1?: number;
  totalBreakTime2?: number;
  totalWorkingHours?: number;
  totalOvertime?: number;
  isDefault?: boolean;
  isActive?: boolean;
  index?: number;
  companyId?: string;
}

export interface WorkshiftWithNavigationPropertiesDto {
  workshift: WorkshiftDto;
  company: CompanyDto;
}
