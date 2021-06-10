export interface LookupDto {
  id: string;
  displayName: string;
}

export interface LookupRequestDto extends PagedResultRequestDto {
  filter: string;
}

export interface EntityDto {
  id?: string;
}

export interface FullAuditedEntityDto extends EntityDto {
  
  creationTime?: string | Date;
  creatorId?: string;
  lastModificationTime?: string | Date;
  lastModifierId?: string;
  isDeleted?: boolean;
  deleterId?: string;
  deletionTime?: Date | string;
}

export declare class ListResultDto<T> {
  items?: T[];
  constructor(initialValues?: Partial<ListResultDto<T>>);
}
export declare class PagedResultDto<T> extends ListResultDto<T> {
  totalCount?: number;
  constructor(initialValues?: Partial<PagedResultDto<T>>);
}

export interface PagedResultRequestDto {
  maxResultCount: number;
  skipCount?: number;
  sorting?: string;
}

export interface PagedAndSortedResultRequestDto extends PagedResultRequestDto {
  sorting?: string;
}

export interface ImageDto {
  id?: string;
  name?: string;
  fileContent?: string;
}


export class Constants {
  static KEY_DEFAULT_LANGUAGE: string = 'ob_dl';
}
