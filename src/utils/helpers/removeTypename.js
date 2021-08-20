export const removeTypename = (data, fields = []) => {
  const omitTypename = (key, value) => (key === '__typename' || fields.includes(key) ? undefined : value);
  return JSON.parse(JSON.stringify(data), omitTypename);
};
