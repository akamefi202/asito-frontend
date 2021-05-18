import * as yup from 'yup';

export default messages => {
  return yup.object().shape({
    username: yup.string().required(messages.REQUIRED),
    password: yup.string().required(messages.REQUIRED)
  });
};
