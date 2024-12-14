/**
 * _Nullable_-значение.
 * @since 1.0.0
 * @version 1.0.0
 * @example
 * StartsWith<"JavaScript", "Java">; // true
 * StartsWith<"TypeScript", "Java">; // false
 */
export type StartsWith<
  Str extends string,
  Substr extends string
> = Str extends `${Substr}${string}` ? true : false
