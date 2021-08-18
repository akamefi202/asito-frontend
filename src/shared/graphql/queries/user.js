import gql from "graphql-tag";


export const USER = gql`
  query User {
    user {
      id
      firstName
      middleName
      lastName
      email
      phone
      issuer {
        id
        name
        number
        address1
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
