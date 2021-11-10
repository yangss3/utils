export type MaybeArray<T> = T | T[]

export type IsNever<T> = [T] extends [never] ? true : false
export type IsAny<T> = 0 extends (1 & T) ? true : false

export type IsUnion<T, B = T> =
  T extends B
    ? [B] extends [T]
      ? false
      : true
    : never

export type Last<T extends any[]> = T extends [...any, infer L] ? L : never
export type Pop<T extends any[]> = T extends [...infer R, any] ? R : never

export type StringToTuple<S extends string> =
  S extends `${infer F}${infer Rest}`
    ? [F, ...StringToTuple<Rest>]
    : []

export type StringToUnion<S extends string> = StringToTuple<S>[number]

export type UnionToIntersection<T> =
  (
    T extends any
      ? (arg: T) => any
      : never
  ) extends (arg: infer R) => any
    ? R
    : never


export type PickByType<T extends Record<string, any>, U> = {
  [
    K in keyof T as string extends any
      ? T[K] extends U
        ? K
        : never
      : never
  ]: T[K]
}


export type Copy<T> = { [K in keyof T]: T[K] }
export type PartialByKeys<T extends Record<string, any>, K extends string = never> =
  [K] extends [never]
    ? Partial<T>
    : Copy<{ [P in keyof T as P extends K ? P : never]?: T[P] } & Omit<T, K>>

export type RequiredByKeys<T extends Record<string, any>, K extends string = never> =
  [K] extends [never]
    ? Required<T>
    : Copy<{ [P in keyof T as P extends K ? P : never]-?: T[P] } & Omit<T, K>>


export type GetRequired<T, U extends Required<T> = Required<T>> = {
  [K in keyof T as T[K] extends U[K] ? K : never]: T[K]
}
export type GetOptional<T, U extends Required<T> = Required<T>> = {
  [K in keyof T as T[K] extends U[K] ? never : K]: T[K]
}
export type RequiredKeys<T> = keyof GetRequired<T>
export type OptionalKeys<T> = keyof GetOptional<T>
