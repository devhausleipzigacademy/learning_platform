export type ValueOf<T> = T[keyof T];

export type MustInclude<T, U extends T[]> = [T] extends [ValueOf<U>]
  ? U
  : never;

export type ArrayNonEmpty<T> = [T, ...T[]];

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

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

/** An array of a given type comprised of either exactly or at least a certain count of that type. */
export type ArrayOf<
  Quantifier extends 'exactly' | 'at least',
  Count extends number,
  Type
> = BuildArrayOf<Quantifier, Count, Type, []>;
