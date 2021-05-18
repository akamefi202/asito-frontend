import gql from "graphql-tag";

export const CLIENT = gql`
  query Client($where: ClientWhereInput) {
    client(where: $where) {
      id
      name
      number
      registrationNumber
      vat
      address
      zipCode
      city
      country
      phone
      email
      website
      sites {
        id
        status
        clientId
        name
        numberOfOperatorsRequired
        latitude
        longitude
        address1
        address2
        zipCode
        city
        country
        operatorSites {
          operator {
            id
            firstName
            lastName
          }
        }
      }
    }
  }
`;

export const CLIENTS = gql`
  query Clients($scan: String, $where: ClientWhereInput, $skip: Int, $take: Int) {
    clients(scan: $scan, where: $where, skip: $skip, take: $take) {
      data {
        id
        name
        number
        registrationNumber
        vat
        address
        zipCode
        city
        country
        phone
        email
        website
        sites {
          id
        }
      }
      count
    }
  }
`;

export default {
  CLIENT,
  CLIENTS,
};
