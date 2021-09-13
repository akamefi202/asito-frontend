/* eslint-disable no-undef */

const checkRecaptcha = () => {
  const promise = new Promise((resolve, reject) => {
    grecaptcha.ready(() =>
      grecaptcha.execute('6LcaKWMcAAAAANd_dHeEyY3PQQklCXHvcKsiKO82', { action: 'submit' })
      .then(token => {
        resolve(token);
      })
      .catch(() => reject('failed to connect to google server'))
    );
  });

  return promise
}

export { checkRecaptcha };


