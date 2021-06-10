export enum LeavePeriod {
  Daily = 0,
  Monthly = 1,
  Yearly = 2,
}

export function leavePeriod() {
  return Object.keys(LeavePeriod).filter(
    (type) => isNaN(<any>type) && type !== 'values'
  );
}
