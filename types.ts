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

export const any = [(val: any): any => val, (val: any): any => val] as const;

export const array = <
  T extends readonly [(arg: any) => any, (arg: any) => any]
>(
  type: T
): [
  (val: Array<Parameters<T[0]>[0]>) => Array<ReturnType<T[0]>>,
  (val: Array<Parameters<T[1]>[0]>) => Array<ReturnType<T[1]>>
] => {
  return [
    (val) => val.map((v) => type[0](v)),
    (val) => val.map((v) => type[1](v)),
  ];
};
