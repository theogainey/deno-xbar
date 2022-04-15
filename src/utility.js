export const pipe = (...functions) =>
  (x) =>
    functions.reduce(
      (acc, fn) => fn(acc),
      x,
    );

export const pipeCompatibleMap = (callback) => (target) => target.map(callback);
export const pipeCompatibleReduce = (callback) =>
  (initValue) => (target) => target.reduce(callback, initValue);
export const pipeCompatibleSplit = (separator) =>
  (target) => target.split(separator);
export const pipeCompatibleFilter = (callback) =>
  (target) => target.filter(callback);
