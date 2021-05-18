import * as yup from 'yup';

export default messages => {
  return yup.object().shape({
    firstName: yup.string().required(messages.REQUIRED),
    lastName: yup.string().required(messages.REQUIRED),
    phone: yup.string().required(messages.REQUIRED),
    email: yup.string().email(messages.EMAIL).required(messages.REQUIRED),
    password: yup.string().required(messages.REQUIRED),
    repetPassword: yup.string().oneOf([yup.ref('password'), null], messages.PASSVORD_MATCH).required(messages.REQUIRED)
  });
};
