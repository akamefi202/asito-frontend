import * as yup from 'yup';

export default messages => {
  return yup.object().shape({
    number: yup.string().required(messages.REQUIRED),
    requirement: yup.object().shape({
      id: yup.string().required(messages.REQUIRED),
    }),
    issuedOn: yup.string().required(messages.REQUIRED),
    infinite: yup.boolean(),
    validUntil: yup.string()
      .when(['infinite'], {
        is: (infinite) => infinite,
        then: yup.string().required(messages.REQUIRED),
        otherwise: yup.string()
      }),
    signedBy: yup.string().required(messages.REQUIRED),
    signerTitle: yup.string().required(messages.REQUIRED),
    employee: yup.object().shape({
      id: yup.string().required(messages.REQUIRED),
    }),
  }, ['validForMonths', 'validForYears']);
};
