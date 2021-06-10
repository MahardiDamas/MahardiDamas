export enum EmployeeStatus {
  Undefined = 0,
  Contract = 1,
  Permanent = 2,
  Probation = 3,
}

export function employeeStatus() {
  return Object.keys(EmployeeStatus).filter(
    (type) => isNaN(<any>type) && type !== 'values'
  );
}
