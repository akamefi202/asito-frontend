import * as yup from 'yup';

export default messages => {
  return yup.object().shape({
    number: yup.string().required(messages.REQUIRED),
    type: yup.string().required(messages.REQUIRED),
    issuedOn: yup.string().required(messages.REQUIRED),
    infinite: yup.boolean(),
    validForMonths: yup.number().integer('Moet een geheel getal zijn').typeError('Ongeldig waardetype')
      .when(['infinite', 'validForYears'], {
        is: (infinite, validForYears) => infinite && !validForYears,
        then: yup.number().min(1, 'Ongeldig waardetype').required(messages.REQUIRED),
        otherwise: yup.number().when('infinite', {
          is: (infinite) => infinite,
          then: yup.number().min(1, 'Ongeldig waardetype'),
          otherwise: yup.number()
        })
      }),
    validForYears: yup.number().integer('Moet een geheel getal zijn').typeError('Ongeldig waardetype')
      .when(['infinite', 'validForMonths'], {
        is: (infinite, validForMonths) => infinite && !validForMonths,
        then: yup.number().min(1, 'Ongeldig waardetype').required(messages.REQUIRED),
        otherwise: yup.number().when('infinite', {
          is: (infinite) => infinite,
          then: yup.number().min(1, 'Ongeldig waardetype'),
          otherwise: yup.number()
        })
      }),
    signedBy: yup.string().required(messages.REQUIRED),
    signerTitle: yup.string().required(messages.REQUIRED),
    employee: yup.object().shape({
      id: yup.string().required(messages.REQUIRED),
    }),
  }, ['validForMonths', 'validForYears']);
};
