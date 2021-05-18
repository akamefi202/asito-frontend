import gql from "graphql-tag";

export const SITE = gql`
  query Site($where: SiteWhereInput) {
    site(where: $where) {
      id
      status
      client {
        id
        name
      }
      name
      numberOfOperatorsRequired
      latitude
      longitude
      address1
      address2
      zipCode
      city
      country
      requirements {
        id
        type
        validAtLeastUntil
        certificates {
          id
        }
      }
      operatorSites {
        id
        site {
          id
        }
        operator {
          id
          number
          firstName
          lastName
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
      }
    }
  }
`;

export const SITES = gql`
  query Sites($where: SiteWhereInput, $skip: Int, $take: Int, $scan: String) {
    sites(where: $where, skip: $skip, take: $take, scan: $scan) {
      data {
        id
        name
        client {
          id
          name
        }
        numberOfOperatorsRequired
        city
        country
        status
        operatorSites {
          id
          site {
            id
          }
          operator {
            id
            number
            firstName
            lastName
            certificates {
              id
            }
          }
        }
        client {
          id
          name
        }
      }
      count
    }
  }
`;

export default {
  SITE,
  SITES,
};
