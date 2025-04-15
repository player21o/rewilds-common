//first function *converts* a property into a networked format
//second function *reverts* a networked format into a property

export const int = [
  (val: number): number => val | 0,
  (val: number): number => val,
] as const;

export const string = [
  (val: string): string => val.toString(),
  (val: string): string => val,
] as const;
