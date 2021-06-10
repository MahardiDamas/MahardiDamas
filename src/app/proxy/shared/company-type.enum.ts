export enum CompanyType {
  Undefined = 0,
  PT = 1,
  CV = 2,
}

export function companyType() {
  return Object.keys(CompanyType).filter(
    (type) => isNaN(<any>type) && type !== 'values'
  );
}
