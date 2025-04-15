import { int, string } from "./types";

export const constructors = {
  //entities
  Citizen: {
    sid: int,
    x: int,
    y: int,
    name: string,
  },

  //packets
  pointer: {
    x: int,
    y: int,
  },
} as const;

export type Constructors = {
  [K in keyof typeof constructors]: {
    [P in keyof (typeof constructors)[K]]: (typeof constructors)[K][P] extends { // Extract the first function's input type
      0: (val: infer T) => any;
    }
      ? T
      : never;
  };
};
