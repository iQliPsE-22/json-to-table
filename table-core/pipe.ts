export function pipe<T>(value: T, ...fns: Array<(v: T) => T>): T {
  return fns.reduce((acc, fn) => fn(acc), value);
}
