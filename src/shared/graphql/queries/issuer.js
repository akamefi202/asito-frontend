import gql from "graphql-tag";

export const ISSUER = gql`
  query issuer {
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
`;

export const ISSUERS = gql`
  query issuers($where: IssuerWhereInput, $lt: IssuerWhereInput, $gt: IssuerWhereInput, $skip: Int, $take: Int) {
    issuers(where: $where, lt: $lt, gt: $gt, skip: $skip, take: $take) {
      data {
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
        certificates {
          id
        }
      }
      count
    }
  }
`;

export default {
  ISSUER,
  ISSUERS,
};
