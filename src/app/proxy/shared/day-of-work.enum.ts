export enum DayOfWork {
  Five = 5,
  Six = 6,
  Seven = 7,
}

export function dayOfWork() {
  return Object.keys(DayOfWork).filter(
    (type) => isNaN(<any>type) && type !== 'values'
  );
}
