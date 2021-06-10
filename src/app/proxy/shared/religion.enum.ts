export enum Religion {
  Undefined = 0,
  Moslem = 1,
  Christian = 2,
  Catholic = 3,
  Hindu = 4,
  Buddhist = 5,
  Shinto = 6,
}

export function religion() {
  return Object.keys(Religion).filter(
    (type) => isNaN(<any>type) && type !== 'values'
  );
}
