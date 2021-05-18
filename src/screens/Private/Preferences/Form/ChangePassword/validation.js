import * as yup from 'yup';

export default messages => {
  return yup.object().shape({
    currentPassword: yup.string().required(messages.REQUIRED),
    newPassword: yup.string().required(messages.REQUIRED),
    confirmNewPassword: yup.string().oneOf([yup.ref('newPassword'), null], messages.PASSVORD_MATCH).required(messages.REQUIRED),
  });
};
