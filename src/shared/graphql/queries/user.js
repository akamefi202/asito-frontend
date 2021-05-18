import gql from "graphql-tag";


export const USER = gql` 
  query User { 
    user { 
      id
      firstName
      lastName
      email
      phone
      issuer {
        id
        name
        vat
        registrationNumber
        number
        address1
        address2
        zipCode
        city
        country
        kind
        phone
        email
        website
      }
    } 
  } 
`;

export default {
  USER,
};
