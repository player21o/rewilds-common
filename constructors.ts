import { any, int, string, tuple } from "./types";

export const constructors = {
  //entities
  Citizen: {
    sid: int,
    x: int,
    y: int,
    name: string,
  },

  Entity: {
    sid: int,
  },

  //packets
  pointer: {
    x: int,
    y: int,
  },

  update: {
    entities: tuple([int, int], any),
  },
} as const;

export type Constructors = {
  [K in keyof typeof constructors]: {
    [P in keyof (typeof constructors)[K]]: (typeof constructors)[K][P] extends {
      // Extract the first function's input type
      0: (val: infer T) => any;
    }
      ? T
      : never;
  };
};

export type UnionToTuple<T> = (
  (T extends any ? (t: T) => T : never) extends infer U
    ? (U extends any ? (u: U) => any : never) extends (v: infer V) => any
      ? V
      : never
    : never
) extends (_: any) => infer W
  ? [...UnionToTuple<Exclude<T, W>>, W]
  : [];

export type ObjectKeysToTuple<T extends object> = UnionToTuple<keyof T>;

export type ObjectValuesToTuple<T extends object> = UnionToTuple<
  keyof T
> extends infer Keys extends Array<keyof T>
  ? { [K in keyof Keys]: T[Keys[K]] }
  : never;
