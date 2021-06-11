import * as yup from 'yup';

export default messages => {
  return yup.object().shape({
    number: yup.string().required(messages.REQUIRED),
    type: yup.string().required(messages.REQUIRED),
    issuedOn: yup.string().required(messages.REQUIRED),
    validUntil: yup.string().required(messages.REQUIRED),
    employee: yup.object().shape({
      id: yup.string().required(messages.REQUIRED),
    }),
  });
};
