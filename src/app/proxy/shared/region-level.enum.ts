export enum RegionLevel {
  Country = 0,
  Province = 1,
  City = 2,
  Disctrict = 3,
  Village = 4,
}

export function regionLevel() {
  return Object.keys(RegionLevel).filter(
    (type) => isNaN(<any>type) && type !== 'values'
  );
}
