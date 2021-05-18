import * as yup from 'yup';

export default messages => {
  return yup.object().shape({
    firstName: yup.string().required(messages.REQUIRED),
    lastName: yup.string().required(messages.REQUIRED),
    email: yup.string().email().required(messages.REQUIRED),
  });
};
