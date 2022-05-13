// deno-lint-ignore ban-types
export const pipe = (...functions: Function[]) =>
  // deno-lint-ignore no-explicit-any
  (x: any) =>
    functions.reduce(
      (acc, fn) => fn(acc),
      x,
    );

export const pipeCompatibleSplit = (separator: string) =>
  (target: string) => target.split(separator);

export const pipeCompatibleMap = <T1, T2>(callback: (x: T1) => T2) =>
  (target: Array<T1>) => target.map(callback);

export const pipeCompatibleFilter = <T>(callback: (x: T) => boolean) =>
  (target: Array<T>) => target.filter(callback);

export const pipeCompatibleReduce = <T1, T2>(
  callback: (
    previousValue: T2,
    currentValue: T1,
    currentIndex: number,
    array: T1[],
  ) => T2,
) =>
  (initValue: T2) => (target: Array<T1>) => target.reduce(callback, initValue);
