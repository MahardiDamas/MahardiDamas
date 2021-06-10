export enum NotificationType {
  Announcement = 0,
  NewEmployee = 1,
  Attendance = 2,
  Overtime = 3,
  Leave = 4,
  Activity = 5,
}

export function notificationType() {
  return Object.keys(NotificationType).filter(
    (type) => isNaN(<any>type) && type !== 'values'
  );
}
