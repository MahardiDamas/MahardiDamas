import type { NotificationType } from '../shared/notification-type.enum';
import type { ApprovalStatus } from '../shared/approval-status.enum';
import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '../shared';
import type { CompanyDto } from '../companies/models';
import type { EmployeeDto } from '../employees/models';

export interface EmployeeNotificationCreateDto {
  code?: string;
  messages: string;
  isRead?: boolean;
  type?: NotificationType;
  approvalStatus?: ApprovalStatus;
  dataId?: string;
  companyId?: string;
  employeeId?: string;
  approvedById?: string;
}

export interface EmployeeNotificationDto extends FullAuditedEntityDto {
  code?: string;
  messages: string;
  isRead?: boolean;
  type?: NotificationType;
  approvalStatus?: ApprovalStatus;
  dataId?: string;
  companyId?: string;
  employeeId?: string;
  approvedById?: string;
}

export interface EmployeeNotificationUpdateDto {
  code?: string;
  messages: string;
  isRead?: boolean;
  type?: NotificationType;
  approvalStatus?: ApprovalStatus;
  dataId?: string;
  companyId?: string;
  employeeId?: string;
  approvedById?: string;
}

export interface EmployeeNotificationWithNavigationPropertiesDto {
  employeeNotification: EmployeeNotificationDto;
  company: CompanyDto;
  employee: EmployeeDto;
}

export interface GetEmployeeNotificationsInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  code?: string;
  messages?: string;
  isRead?: boolean;
  type?: NotificationType;
  approvalStatus?: ApprovalStatus;
  dataId?: string;
  companyId?: string;
  employeeId?: string;
  approvedById?: string;
}
