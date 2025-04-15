import { int, string } from "./types";

export const constructors = {
  Citizen: {
    sid: int,
    x: int,
    y: int,
    name: string,
  },
} as const;

export type Constructors = {
  [P in keyof typeof constructors]: {
    [F in keyof (typeof constructors)[P]]: (typeof constructors)[P][F] extends (
      ...args: any
    ) => any
      ? ReturnType<(typeof constructors)[P][F]>
      : never;
  };
};
