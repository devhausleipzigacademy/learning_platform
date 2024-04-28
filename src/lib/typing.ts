export type ValueOf<T> = T[keyof T];

export type MustInclude<T, U extends T[]> = [T] extends [ValueOf<U>]
  ? U
  : never;

export type ArrayNonEmpty<T> = [T, ...T[]];

////////////////////////

/**
 * @link https://stackoverflow.com/a/55858763
 */
export type UnionToIntersection<U> = (
  U extends never ? never : (arg: U) => never
) extends (arg: infer I) => void
  ? I
  : never;

/**
 * @link https://stackoverflow.com/a/55858763
 */
export type UnionToTuple<T> =
  UnionToIntersection<T extends never ? never : (t: T) => T> extends (
    _: never
  ) => infer W
    ? [...UnionToTuple<Exclude<T, W>>, W]
    : [];

/**
 * @link https://stackoverflow.com/a/55858763
 */
export type UnionToOvlds<U> = UnionToIntersection<
  U extends any ? (f: U) => void : never
>;

/**
 * @link https://stackoverflow.com/a/55858763
 */
export type PopUnion<U> =
  UnionToOvlds<U> extends (a: infer A) => void ? A : never;

////////////////////////

/**
 * @link https://stackoverflow.com/a/73409753
 */
type BuildArrayOf<
  Quantifier extends 'exactly' | 'at least',
  Count extends number,
  Type,
  Current extends Type[]
> = Current['length'] extends Count
  ? Quantifier extends 'exactly'
    ? [...Current]
    : [...Current, ...Type[]]
  : BuildArrayOf<Quantifier, Count, Type, [...Current, Type]>;

/** An array of a given type comprised of either exactly or at least a certain count of that type.
 * @link https://stackoverflow.com/a/73409753
 */
export type ArrayOf<
  Quantifier extends 'exactly' | 'at least',
  Count extends number,
  Type
> = BuildArrayOf<Quantifier, Count, Type, []>;
