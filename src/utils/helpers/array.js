export const withoutRepetitions = (array, comparer) => {
  const count = array.length;
  if (!comparer) comparer = { equals(v1, v2) { return v1.key === v2.key } };
  let set = [];
  for (let i = 0; i < count; ++i) {
    let item = array[i];
    if (!set.some(e => comparer.equals(e, item))) {
      set.push(item);
    }
  }
  return set;
}