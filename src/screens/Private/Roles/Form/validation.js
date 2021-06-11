import * as yup from 'yup';

export default messages => {
  return yup.object().shape({
    status: yup.string().required(messages.REQUIRED),
    name: yup.string().required(messages.REQUIRED),
    numberOfEmployeesRequired: yup.number().typeError(messages.NUMBER || true).required(messages.REQUIRED),
    // latitude: yup.number().typeError(messages.NUMBER || true).required(messages.REQUIRED),
    // longitude: yup.number().typeError(messages.NUMBER || true).required(messages.REQUIRED),
    // address1: yup.string().required(messages.REQUIRED),
    // address2: yup.string(),
    // zipCode: yup.string().required(messages.REQUIRED),
    // city: yup.string().required(messages.REQUIRED),
    // country: yup.string().required(messages.REQUIRED),
    // department: yup.object().shape({
    //   id: yup.string().required(messages.REQUIRED),
    // }),
    // requirements: yup.array().of(
    //   yup.object().shape({
    //     type: yup.string().required(messages.REQUIRED),
    //     validAtLeastUntil: yup.string().required(messages.REQUIRED),
    //   })
    // )
  });
};
