export enum DayOfWeeks {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export function dayOfWeeks() {
  return Object.keys(DayOfWeeks).filter(
    (type) => isNaN(<any>type) && type !== 'values'
  );
}
