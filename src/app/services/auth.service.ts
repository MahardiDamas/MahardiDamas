import { Injectable } from '@angular/core';
import { ImageDto } from '@app/proxy/shared';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // http://docs.identityserver.io/en/3.1.0/endpoints/discovery.html
  // https://github.com/manfredsteyer/angular-oauth2-oidc
  // https://developer.okta.com/blog/2017/08/22/build-an-ionic-app-with-user-authentication

  constructor(
    private httpService: HttpService
  ) {

  }

  discovery() {
    return this.httpService.get(`/.well-known/openid-configuration`);
  }

  getTenants() {
    return this.httpService.getTenant(`/api/multi-tenancy/tenants`);
  }

  getTenantByName(tenantName: string) {
    return this.httpService.getTenant(`/api/abp/multi-tenancy/tenants/by-name/${tenantName}`);
  }

  getTenantById(tenantId: string) {
    return this.httpService.getTenant(`/api/abp/multi-tenancy/tenants/by-id/${tenantId}`);
  }

  getApplicationConfiguration(tenant: string, token: string): Observable<any> {
    return this.httpService.getWithAuth(`/api/abp/application-configuration`, tenant, token);
  }  

  login(authData: any, tenant: string) {
    return this.httpService.token(authData, tenant);
  }

  logout() {
    return this.httpService.get('/api/account/logout');
  }

  getUserRoles(id: any) {
    return this.httpService.get(`/api/identity/users/${id}/roles`);
  }

  updateProfileDetail(body: any) {
    return this.httpService.post(`/api/identity/my-profile`, body);
  }

  changePassword(body: any) {
    return this.httpService.post(`/api/identity/my-profile/change-password`, body);
  }
  
  resetPassword(body: any) {
    return this.httpService.post('/api/account/send-password-reset-code', body);
  }

  getProfilePicture(id: string) {
    return this.httpService.get(`/api/account/profile-picture/${id}`);
  }

  updateProfilePicture(id: string, data: ImageDto) {
    return this.httpService.get(`/api/account/profile-picture`, data);
  }
}