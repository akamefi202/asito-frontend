import * as yup from 'yup';

export default messages => {
  return yup.object().shape({
    number: yup.string().required(messages.REQUIRED),
    firstName: yup.string().required(messages.REQUIRED),
    lastName: yup.string().required(messages.REQUIRED),
    dateOfBirth: yup.string().required(messages.REQUIRED),
    gender: yup.string().required(messages.REQUIRED),
    phone: yup.string().required(messages.REQUIRED),
    email: yup.string().email().required(messages.REQUIRED),
    accesses: yup.array().of(
      yup.object().shape({
        clientId: yup.string().required(messages.REQUIRED),
        sharedOn: yup.string().required(messages.REQUIRED),
        sharedUntil: yup.string().required(messages.REQUIRED),
      })
    )
  });
};
