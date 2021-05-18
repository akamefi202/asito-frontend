export const delay = (() => {
  let timer = 0;
  return function (callback: () => void | Promise<void>, ms: number) {
    clearTimeout(timer);
    timer = window.setTimeout(callback, ms);
  };
})();

export const waitUntil = (fnCondition, spinTime) => {
  return new Promise((res, rej) => {
    const step = 100;

    const looper = function () {
      if (fnCondition) {
        res();
      } else {
        if (spinTime <= 0) {
          res();
        } else {
          spinTime -= step;
          setTimeout(looper, step);
        }
      }
    };

    looper();
  });
};