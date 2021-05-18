import gql from "graphql-tag";

export const OPERATOR_SITE = gql`
  query operatorSite($where: OperatorSiteWhereInput, $skip: Int, $take: Int) {
    operatorSite(where: $where, skip: $skip, take: $take) {
      id
      site {
        id
        name
        numberOfOperatorsRequired
        city
        country
        status
      }
      operator {
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
          requirement {
            id
            type
            validAtLeastUntil      
          }
        }
      }
      assignedFrom
      assignedUntil
    }
  }
`;

export const OPERATOR_SITES = gql`
  query operatorSites($where: OperatorSiteWhereInput, $skip: Int, $take: Int, $scan: String) {
    operatorSites(where: $where, skip: $skip, take: $take, scan: $scan) {
      data {
        id
        site {
          id
          name
          numberOfOperatorsRequired
          city
          country
          status
        }
        operator {
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
            validUntil
            requirement {
              id
              type
              validAtLeastUntil      
            }
          }
        }
        assignedFrom
        assignedUntil
      }
      count
    }
  }
`;

export default {
  OPERATOR_SITES,
  OPERATOR_SITES
};
