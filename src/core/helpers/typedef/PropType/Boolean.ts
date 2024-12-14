export type Boolean<T extends boolean = boolean> = BooleanConstructor &
  (() => T)
