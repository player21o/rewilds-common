import { any, array, int, string, tuple } from "./types";

export const constructors = [
  //entities
  [
    "Citizen",
    [
      ["sid", int],
      ["x", int],
      ["y", int],
      ["name", string],
    ],
  ],
  ["Entity", [["sid", int]]],

  //packets
  ["update", [["entities", array(tuple([int, int], any))]]],
  ["snapshot", [["entities", array(tuple([int], any))]]],
  [
    "pointer",
    [
      ["x", int],
      ["y", int],
    ],
  ],
  ["hello", []],
] as const;

export const constructors_object = Object.fromEntries(
  constructors.map(([constructor, props]) => [
    constructor,
    Object.fromEntries(props),
  ])
) as ConstructorsToObject<typeof constructors>;

export const constructors_keys = constructors.map(
  ([name]) => name
) as ExtractConstructorNames<typeof constructors>;

export const constructors_inner_keys = Object.fromEntries(
  constructors.map(([name, props]) => [
    name,
    // Use double assertion to preserve tuple type
    props.map(([n]) => n) as unknown as ExtractProps<typeof props>,
  ])
) as GetConstructorsInnerKeys<typeof constructors>;

export type ConstructorsObject = {
  [K in keyof typeof constructors_object]: {
    [P in keyof (typeof constructors_object)[K]]: (typeof constructors_object)[K][P] extends {
      // Extract the first function's input type
      0: (val: infer T) => any;
    }
      ? T
      : never;
  };
};

export type Constructors = ConstructorsToNetworkedArray<typeof constructors>;

export type ConstructorsInnerKeys = GetConstructorsInnerKeys<Constructors>;

export type ConstructorsInnerTypes = GetConstructorsInnerTypes<Constructors>;

type ConstructorsToObject<
  T extends readonly (readonly [string, readonly (readonly [string, any])[]])[]
> = {
  [K in T[number][0]]: {
    [P in Extract<T[number], readonly [K, any]>[1][number] as P[0]]: P[1];
  };
};

type ConstructorsToNetworkedArray<T extends readonly any[]> = {
  [K in keyof T]: MapConstructor<T[K]>;
};

type ExtractPropTypes<T extends readonly (readonly [any, any])[]> = {
  [K in keyof T]: T[K] extends readonly [any, infer Type] ? Type : never;
};

type GetConstructorsInnerTypes<T extends readonly any[]> = {
  [C in T[number] as C[0]]: C[1] extends readonly (readonly [any, any])[]
    ? ExtractPropTypes<C[1]>
    : never;
};

type ExtractNetworkedType<T> = T extends readonly [
  infer Conv extends (...args: any) => any,
  any
]
  ? Parameters<Conv>[0]
  : T extends (...args: any) => infer R
  ? ExtractNetworkedType<R>
  : never;

type MapConstructor<T> = T extends readonly [infer Name, infer Props]
  ? [
      Name,
      Props extends readonly (readonly [infer _, infer _])[]
        ? {
            [K in keyof Props]: Props[K] extends readonly [infer PN, infer T]
              ? [PN, ExtractNetworkedType<T>]
              : never;
          }
        : never
    ]
  : never;

type ExtractProps<T> = T extends readonly (readonly [infer _, any])[]
  ? { [K in keyof T]: T[K] extends readonly [infer Name, any] ? Name : never }
  : never;

type GetConstructorsInnerKeys<T extends readonly (readonly [string, any])[]> = {
  [K in T[number] as K[0]]: ExtractProps<K[1]>;
};

type ExtractConstructorNames<T> = T extends readonly [infer Head, ...infer Tail]
  ? Head extends readonly [infer Name, any]
    ? [Name, ...ExtractConstructorNames<Tail>]
    : never
  : [];
