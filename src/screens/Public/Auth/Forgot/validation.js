import * as yup from 'yup';

export default messages => {
  return yup.object().shape({email: yup.string().email(messages.EMAIL).required(messages.REQUIRED)});
};
