export enum OfficeType {
  Undefined = 0,
  Holding = 1,
  Head = 2,
  Regional = 3,
  Branch = 4,
  Agency = 5,
  Sister = 6,
}

export function officeType() {
  return Object.keys(OfficeType).filter(
    (type) => isNaN(<any>type) && type !== 'values'
  );
}
