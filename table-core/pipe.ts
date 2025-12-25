export function pipe<T>(value: T): T;
export function pipe<T, A>(value: T, f1: (v: T) => A): A;
export function pipe<T, A, B>(value: T, f1: (v: T) => A, f2: (v: A) => B): B;
export function pipe<T, A, B, C>(
  value: T,
  f1: (v: T) => A,
  f2: (v: A) => B,
  f3: (v: B) => C
): C;
export function pipe<T, A, B, C, D>(
  value: T,
  f1: (v: T) => A,
  f2: (v: A) => B,
  f3: (v: B) => C,
  f4: (v: C) => D
): D;
export function pipe<T, A, B, C, D, E>(
  value: T,
  f1: (v: T) => A,
  f2: (v: A) => B,
  f3: (v: B) => C,
  f4: (v: C) => D,
  f5: (v: D) => E
): E;
export function pipe(value: any, ...fns: Function[]): any {
  return fns.reduce((acc, fn) => fn(acc), value);
}
