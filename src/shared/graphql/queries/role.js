import gql from "graphql-tag";

export const ROLE = gql`
  query role($where: RoleWhereInput) {
    role(where: $where) {
      id
      status
      department {
        id
        name
      }
      name
      numberOfEmployeesRequired
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
      employeeRoles {
        id
        role {
          id
        }
        employee {
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

export const ROLES = gql`
  query roles($where: RoleWhereInput, $skip: Int, $take: Int, $scan: String) {
    roles(where: $where, skip: $skip, take: $take, scan: $scan) {
      data {
        id
        name
        department {
          id
          name
        }
        numberOfEmployeesRequired
        city
        country
        status
        requirements {
          id
        }
        employeeRoles {
          id
          role {
            id
          }
          employee {
            id
            number
            firstName
            lastName
            certificates {
              id
            }
          }
        }
      }
      count
    }
  }
`;

export default {
  ROLE,
  ROLES,
};
