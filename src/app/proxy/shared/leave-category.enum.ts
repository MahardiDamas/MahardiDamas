export enum LeaveCategory {
  Personal = 0,
  Company = 1,
  Permission = 2,
}

export function leaveCategory() {
  return Object.keys(LeaveCategory).filter(
    (type) => isNaN(<any>type) && type !== 'values'
  );
}
