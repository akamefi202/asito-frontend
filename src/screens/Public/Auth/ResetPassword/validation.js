import * as yup from 'yup';

export default messages => {
    return yup.object().shape({
        newPassword: yup.string().required(messages.REQUIRED),
        repeatPassword: yup.string().oneOf([yup.ref('newPassword'), null], messages.PASSVORD_MATCH).required(messages.REQUIRED)
    });
};
