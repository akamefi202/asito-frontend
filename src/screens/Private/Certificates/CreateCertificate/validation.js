import * as yup from 'yup';

export default messages => {
  return yup.object().shape({
    number: yup.string().required(messages.REQUIRED),
    type: yup.string().required(messages.REQUIRED),
    issuedOn: yup.string().required(messages.REQUIRED),
    infinite: yup.boolean(),
    validForMonths: yup.number().integer('Moet een geheel getal zijn').typeError('Ongeldig waardetype').min(1, 'Ongeldig waardetype')
      .when(['infinite', 'validForYears'], {
        is: (infinite, validForYears) => infinite && !validForYears,
        then: yup.number().required(messages.REQUIRED),
      }),
    validForYears: yup.number().integer('Moet een geheel getal zijn').typeError('Ongeldig waardetype').min(1, 'Ongeldig waardetype')
      .when(['infinite', 'validForMonths'], {
        is: (infinite, validForMonths) => infinite && !validForMonths,
        then: yup.number().required(messages.REQUIRED),
        otherwise: yup.number()
      }),
    signedBy: yup.string().required(messages.REQUIRED),
    signerTitle: yup.string().required(messages.REQUIRED),
    employee: yup.object().shape({
      id: yup.string().required(messages.REQUIRED),
    }),
  }, ['validForMonths', 'validForYears']);
};
