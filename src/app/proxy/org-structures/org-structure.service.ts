import type { GetOrgStructuresInput, OrgStructureCreateDto, OrgStructureDto, OrgStructureUpdateDto, OrgStructureWithNavigationPropertiesDto } from './models';
import { Injectable } from '@angular/core';
import type { LookupDto, LookupRequestDto } from '../shared/models';
import { HttpService } from '@app/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class OrgStructureService {
  apiName = 'Default';

  constructor(
    private httpService: HttpService
  ) {}

  
}
