export const modalWidth = (width) => {
  return width > 1600
    ? `${width / 2.5}px`
    : width > 1200
    ? `${width / 2}px`
    : `${width}px`;
};
