export enum RequestType {
  Workshift = 0,
  Attendance = 1,
  Overtime = 2,
  Leave = 3,
}

export function requestType() {
  return Object.keys(RequestType).filter(
    (type) => isNaN(<any>type) && type !== 'values'
  );
}
