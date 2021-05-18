export const removeTypename = (data) => {
  const omitTypename = (key, value) => (key === '__typename' ? undefined : value);
  return JSON.parse(JSON.stringify(data), omitTypename);
};
