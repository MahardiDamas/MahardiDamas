import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Storage } from '@ionic/storage';

export interface formData {
  username: string;
  password: string;
  grant_type: string;
  scope: string;
  client_id: string;
  client_secret: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  host: string = environment.apis.default.url;
  headers = new HttpHeaders();

  constructor(
    public http: HttpClient,
    private storage: Storage
    ) {
      Promise.all([
        this.storage.get(`${environment.appName}_tenant`),
        this.storage.get(`${environment.appName}_access_token`)
      ]).then(([tenant, token]) => {
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Access-Control-Allow-Origin', '*');
        
        if (tenant != null) {
          this.headers = this.headers.set('__tenant', tenant.tenantId);
        }   
        
        if (token != null) {
          this.headers = this.headers.set('Authorization', `Bearer  ${token.access_token}`);
        }        
      });
  } 
  
  token(body: any, tenant: string) {
    const reqOpts = new HttpHeaders()
      .set('__tenant', tenant)
      .set("Content-Type", "application/x-www-form-urlencoded");

    let httpParams = new HttpParams()
        .append('grant_type', 'password')
        .append('scope', `${environment.oAuthConfig.scope}`)
        .append('username', body.username)
        .append('password', body.password)
        .append('client_id', environment.oAuthConfig.clientId)
        .append('client_secret', environment.oAuthConfig.dummyClientSecret);

      return this.http.post(this.host + '/connect/token', httpParams.toString(), { headers: reqOpts });
  }

  getTenant(endpoint: string) {
    const reqOpts = new HttpHeaders();
    return this.http.get(this.host + endpoint, { headers : reqOpts });
  }  

  getWebLocation(endpoint: string) {
    return this.http.get(endpoint);
  }

  getWithAuth(endpoint: string, tenant: string, token: string) {
    const reqOpts = new HttpHeaders()
      .set('__tenant', tenant)
      .set('Authorization', `Bearer  ${token}`);
    return this.http.get(this.host + endpoint, { headers : reqOpts });
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    reqOpts = this.headers;
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (params.hasOwnProperty(k)) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }

    return this.http.get(this.host + endpoint, { headers: reqOpts, params: reqOpts.params });
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    reqOpts = this.headers;
    return this.http.post(this.host + endpoint, body, { headers: reqOpts });
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    reqOpts = this.headers;
    return this.http.put(this.host + endpoint, body, { headers: reqOpts });
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    reqOpts = this.headers;
    return this.http.patch(this.host + endpoint, body, { headers: reqOpts });
  }

  delete(endpoint: string, reqOpts?: any) {
    reqOpts = this.headers;
    return this.http.delete(this.host + endpoint, { headers: reqOpts });
  }

}
