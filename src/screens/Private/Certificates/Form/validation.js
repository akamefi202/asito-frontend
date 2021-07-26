import * as yup from 'yup';

export default messages => {
  return yup.object().shape({
    number: yup.string().required(messages.REQUIRED),
    type: yup.string().required(messages.REQUIRED),
    issuedOn: yup.string().required(messages.REQUIRED),
    validForMonths: yup.number().typeError("Ongeldig waardetype"),
    validForYear: yup.number().typeError("Ongeldig waardetype"),
    signedBy: yup.string().required(messages.REQUIRED),
    signerTitle: yup.string().required(messages.REQUIRED),
    employee: yup.object().shape({
      id: yup.string().required(messages.REQUIRED),
    }),
  });
};
