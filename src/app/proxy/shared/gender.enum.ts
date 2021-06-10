export enum Gender {
  Undefined = 0,
  Male = 1,
  Female = 2,
}

export function gender() {
  return Object.keys(Gender).filter(
    (type) => isNaN(<any>type) && type !== 'values'
  );
}