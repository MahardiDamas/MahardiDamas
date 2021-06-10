export enum Ptkp {
  K0 = 0,
  K1 = 1,
  K2 = 2,
  K3 = 3,
  TK0 = 4,
  TK1 = 5,
  TK2 = 6,
  TK3 = 7,
}

export function ptkp() {
  return Object.keys(Ptkp).filter(
    (type) => isNaN(<any>type) && type !== 'values'
  );
}
