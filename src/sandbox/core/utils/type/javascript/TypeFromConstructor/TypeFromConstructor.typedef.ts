import type { AnyArray, AnyFunction, IsAny } from 'ts-essentials'
import type { TypeConstructor } from '../TypeConstructor'

/** Вывести _typescript_-тип на основании конструктора типа */
export type TypeFromConstructor<T extends TypeConstructor> =
  IsAny<T> extends true ? never : Go<T>

type Go<T extends TypeConstructor> = T extends ArrayConstructor
  ? AnyArray<unknown>
  : T extends BooleanConstructor
    ? boolean
    : T extends FunctionConstructor
      ? AnyFunction<unknown[], unknown>
      : T extends NumberConstructor
        ? number
        : T extends ObjectConstructor
          ? object
          : T extends StringConstructor
            ? string
            : never
