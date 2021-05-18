import gql from "graphql-tag";

export const OPERATOR = gql`
  query Operator($where: OperatorWhereInput) {
    operator(where: $where) {
      id
      number
      firstName
      lastName
      dateOfBirth
      gender
      phone
      email
      address1
      address2
      zipCode
      city
      country
      certificates {
          id
          number
          issuedOn
          validUntil
          requirement {
            id
            type
            validAtLeastUntil      
          }
      }
      operatorSites {
        id
        assignedFrom
        assignedUntil
        site {
          id
          status
          name
          numberOfOperatorsRequired
          latitude
          longitude
          address1
          address2
          zipCode
          city
          country
          client {
            id
            name
          }
        }
      }
    }
  }
`;

export const OPERATORS = gql`
  query Operators($where: OperatorWhereInput, $like: OperatorWhereInput, $scan: String, $skip: Int, $take: Int) {
    operators(where: $where, like: $like, scan: $scan, skip: $skip, take: $take) {
      data {
        id
        number
        firstName
        lastName
        dateOfBirth
        gender
        phone
        email
        address1
        address2
        zipCode
        city
        country
        certificates {
            id
        }
        operatorSites {
          id
          assignedFrom
          assignedUntil
          site {
            id
          }
        }
        accesses {
          id
          status
        }
      }
      count
    }
  }
`;

export default {
  OPERATOR,
  OPERATORS,
};
