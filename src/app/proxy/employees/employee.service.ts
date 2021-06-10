import type { EmployeeCreateDto, EmployeeDto, EmployeeUpdateDto, EmployeeWithNavigationPropertiesDto, GetEmployeesInput } from './models';
import { Injectable } from '@angular/core';
// import type { LookupDto, LookupRequestDto } from '../shared/models';
import { HttpService } from '@app/services/http.service';
import { Observable } from 'rxjs';
import { ImageDto } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiName = 'Default';

  constructor(
    private httpService: HttpService
  ) {}

  get(id: string): Observable<any> {
    return this.httpService.get(`/api/app/employees/${id}`);
  }  

  getCurrentEmployeeInformation(id: any, tenant?: string, token?: string) {
    return tenant !== null 
      ? this.httpService.getWithAuth(`/api/employee/current-employee-information/${id}`, tenant, token)
      : this.httpService.get(`/api/employee/current-employee-information/${id}`);
  }

  getEmployeeLookup() {
    return this.httpService.get('/api/app/employee/lookupList');
  }

  getEmployeeLookupById(id: any) {
    return this.httpService.get(`/api/app/employee/${id}/lookupList`);
  }

  // getCompanyLookup = (input: LookupRequestDto) =>
  //   this.restService.request<any, PagedResultDto<LookupDto<string>>>({
  //     method: 'GET',
  //     url: '/api/app/employees/company-lookup',
  //     params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
  //   },
  //   { apiName: this.apiName });

  // getEducationLookup = (input: LookupRequestDto) =>
  //   this.restService.request<any, PagedResultDto<LookupDto<string>>>({
  //     method: 'GET',
  //     url: '/api/app/employees/education-lookup',
  //     params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
  //   },
  //   { apiName: this.apiName });

  // getJobPositionLookup = (input: LookupRequestDto) =>
  //   this.restService.request<any, PagedResultDto<LookupDto<string>>>({
  //     method: 'GET',
  //     url: '/api/app/employees/job-position-lookup',
  //     params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
  //   },
  //   { apiName: this.apiName });

  // getList = (input: GetEmployeesInput) =>
  //   this.restService.request<any, PagedResultDto<EmployeeWithNavigationPropertiesDto>>({
  //     method: 'GET',
  //     url: '/api/app/employees',
  //     params: { filterText: input.filterText, code: input.code, photo: input.photo, firstName: input.firstName, middleName: input.middleName, lastName: input.lastName, fullName: input.fullName, description: input.description, placeOfBirth: input.placeOfBirth, dateOfBirthMin: input.dateOfBirthMin, dateOfBirthMax: input.dateOfBirthMax, gender: input.gender, bloodType: input.bloodType, religion: input.religion, marital: input.marital, dateOfMarriageMin: input.dateOfMarriageMin, dateOfMarriageMax: input.dateOfMarriageMax, nationality: input.nationality, address: input.address, country: input.country, province: input.province, city: input.city, district: input.district, village: input.village, postal: input.postal, latitude: input.latitude, longitude: input.longitude, phone: input.phone, businessPhone: input.businessPhone, email: input.email, businessEmail: input.businessEmail, employeeNo: input.employeeNo, employeeStatus: input.employeeStatus, benefitTemplateId: input.benefitTemplateId, hireDateMin: input.hireDateMin, hireDateMax: input.hireDateMax, joinDateMin: input.joinDateMin, joinDateMax: input.joinDateMax, exitDateMin: input.exitDateMin, exitDateMax: input.exitDateMax, exitReason: input.exitReason, managerId: input.managerId, approved1ById: input.approved1ById, approved2ById: input.approved2ById, approved3ById: input.approved3ById, familyCardNo: input.familyCardNo, idCardNo: input.idCardNo, passportNo: input.passportNo, passportExpiredDateMin: input.passportExpiredDateMin, passportExpiredDateMax: input.passportExpiredDateMax, npwpNo: input.npwpNo, ptkp: input.ptkp, bpjsKsNo: input.bpjsKsNo, bpjsFaskes: input.bpjsFaskes, bpjsKsStatus: input.bpjsKsStatus, bpjsTkNo: input.bpjsTkNo, bank: input.bank, bankAccNo: input.bankAccNo, bankAccName: input.bankAccName, mobileDeviceId: input.mobileDeviceId, isLocationLockAttendance: input.isLocationLockAttendance, isSelfieAttendance: input.isSelfieAttendance, isThirdPartyAttendance: input.isThirdPartyAttendance, userId: input.userId, userName: input.userName, isDisabled: input.isDisabled, isHasApprovalRole: input.isHasApprovalRole, isAttendanceApproval: input.isAttendanceApproval, isOvertimeApproval: input.isOvertimeApproval, isLeaveApproval: input.isLeaveApproval, isWorkshiftApproval: input.isWorkshiftApproval, password: input.password, companyId: input.companyId, directorateId: input.directorateId, divisionId: input.divisionId, departmentId: input.departmentId, sectionId: input.sectionId, projectId: input.projectId, locationId: input.locationId, jobPositionId: input.jobPositionId, jobTitleId: input.jobTitleId, educationId: input.educationId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
  //   },
  //   { apiName: this.apiName });

  // getLocationLookup = (input: LookupRequestDto) =>
  //   this.restService.request<any, PagedResultDto<LookupDto<string>>>({
  //     method: 'GET',
  //     url: '/api/app/employees/location-lookup',
  //     params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
  //   },
  //   { apiName: this.apiName });

  // getOrgStructureLookup = (input: LookupRequestDto) =>
  //   this.restService.request<any, PagedResultDto<LookupDto<string>>>({
  //     method: 'GET',
  //     url: '/api/app/employees/org-structure-lookup',
  //     params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
  //   },
  //   { apiName: this.apiName });

  // getWithNavigationProperties = (id: string) =>
  //   this.restService.request<any, EmployeeWithNavigationPropertiesDto>({
  //     method: 'GET',
  //     url: `/api/app/employees/with-navigation-properties/${id}`,
  //   },
  //   { apiName: this.apiName });

  getWithNavigationProperties(id: string): Observable<any> {
    return this.httpService.get(`/api/app/employees/with-navigation-properties/${id}`);
  }

  // update = (id: string, input: EmployeeUpdateDto) =>
  //   this.restService.request<any, EmployeeDto>({
  //     method: 'PUT',
  //     url: `/api/app/employees/${id}`,
  //     body: input,
  //   },
  //   { apiName: this.apiName });

  update(id: string, data : EmployeeUpdateDto) : Observable<any> {
    return  this.httpService.put(`/api/app/employee/${id}`, data)
  }

  changeProfilePicture(data : ImageDto) : Observable<any> {
    return  this.httpService.post(`/api/account/profile-picture`, data)
  }

  getProfilePicture(id: string) : Observable<any> {
    return  this.httpService.get(`/api/account/profile-picture/${id}`)
  }
}