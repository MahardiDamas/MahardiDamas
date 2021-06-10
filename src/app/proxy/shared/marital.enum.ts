export enum Marital {
  Undefined = 0,
  Single = 1,
  Married = 2,
  Divorced = 3,
}

export function marital() {
  return Object.keys(Marital).filter(
    (type) => isNaN(<any>type) && type !== 'values'
  );
}