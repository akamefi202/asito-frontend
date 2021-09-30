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
      employee {
        id
        number
        firstName
        middleName
        lastName
        dateOfBirth
        gender
        avatar
        phone
        email
        address1
        address2
        zipCode
        city
        country
        wallet
      }
    }
  }
`;

export default {
  USER,
};
