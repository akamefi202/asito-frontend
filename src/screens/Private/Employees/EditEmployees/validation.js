import * as yup from 'yup';

export default messages => {
  return yup.object().shape({
    number: yup.string().required(messages.REQUIRED),
    firstName: yup.string().required(messages.REQUIRED),
    middleName: yup.string(),
    lastName: yup.string().required(messages.REQUIRED),
    dateOfBirth: yup.string().required(messages.REQUIRED),
    gender: yup.string().required(messages.REQUIRED),
    phone: yup.string().required(messages.REQUIRED),
    email: yup.string().email().required(messages.REQUIRED),
    address1: yup.string().required(messages.REQUIRED),
    zipCode: yup.string().required(messages.REQUIRED),
    city: yup.string().required(messages.REQUIRED),
    country: yup.string().required(messages.REQUIRED),
  });
};
