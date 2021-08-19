import * as yup from 'yup';

export default messages => {
  return yup.object().shape({
    status: yup.string().required(messages.REQUIRED),
    name: yup.string().required(messages.REQUIRED),
    numberOfEmployeesRequired: yup.number().typeError(messages.NUMBER || true).required(messages.REQUIRED),
    roleDescription: yup.string()
  });
};
