import * as yup from 'yup';

export default messages => {
  return yup.object().shape({
    name: yup.string().required(messages.REQUIRED),
    number: yup.number().typeError(messages.NUMBER || true).required(messages.REQUIRED),
    address: yup.string().required(messages.REQUIRED),
    zipCode: yup.number().typeError(messages.NUMBER || true).required(messages.REQUIRED),
    city: yup.string().required(messages.REQUIRED),
    country: yup.string().required(messages.REQUIRED),
  });
};
