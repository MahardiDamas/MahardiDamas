export enum BloodType {
  Undefined = 0,
  O = 1,
  A = 2,
  B = 3,
  AB = 4,
}

export function bloodType() {
  return Object.keys(BloodType).filter(
    (type) => isNaN(<any>type) && type !== 'values'
  );
}
