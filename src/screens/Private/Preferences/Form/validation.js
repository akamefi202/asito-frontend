import * as yup from 'yup';

export const info = messages => {
  return yup.object().shape({
    firstName: yup.string().required(messages.REQUIRED),
    lastName: yup.string().required(messages.REQUIRED),
    email: yup.string().email('Moet een geldige e-mailadres zijn').required(messages.REQUIRED),
  });
};

export const passwords = messages => {
  return yup.object().shape({
    password: yup.string().required(messages.REQUIRED),
    newPassword: yup.string().required(messages.REQUIRED),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], messages.PASSVORD_MATCH).required(messages.REQUIRED),
  });
};

