
export const uniq = (arr, pred) => {
  if (pred == null) return [...new Set(arr)];

  // from https://stackoverflow.com/a/40808569
  const cb = typeof pred === 'function' ? pred : (o) => get(o, pred);

  return [...arr.reduce((map, item) => {
    const key = (item === null || item === undefined) ? item : cb(item);

    if (!map.has(key)) map.set(key, item);

    return map;
  }, new Map()).values()];
}


const _preparePath = (path) => {
  if (Array.isArray(path)) return path;

  return String(path).split('.');
}

export const get = (obj, path) => {
  if (path == null) return obj;

  return _preparePath(path).reduce((v, f) => v && v[f], obj);
}
