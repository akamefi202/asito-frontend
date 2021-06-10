import * as yup from 'yup';

export default messages => {
  return yup.object().shape({
    name: yup.string().required(messages.REQUIRED),
    number: yup.number().typeError(messages.NUMBER || true).required(messages.REQUIRED),
    address1: yup.string().required(messages.REQUIRED),
    zipCode: yup.string().required(messages.REQUIRED),
    city: yup.string().required(messages.REQUIRED),
    country: yup.string().required(messages.REQUIRED),
    kind: yup.string(),
    phone: yup.string().required(messages.REQUIRED),
    email: yup.string().email(messages.EMAIL).required(messages.REQUIRED),
    website: yup.string().url(messages.URL).required(messages.REQUIRED),
  });
};
