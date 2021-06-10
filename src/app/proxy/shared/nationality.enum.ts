export enum Nationality {
  Undefined = 0,
  WNI = 1,
  WNA = 2,
}

export function nationality() {
  return Object.keys(Nationality).filter(
    (type) => isNaN(<any>type) && type !== 'values'
  );
}
