import gql from "graphql-tag";

export const ROLE = gql`
  query role($where: RoleWhereInput) {
    role(where: $where) {
      id
      status
      departments {
        id
        name
        type
        location
      }
      accepted
      roleDescription
      name
      numberOfEmployeesRequired
      latitude
      longitude
      address1
      address2
      zipCode
      city
      country
      protocols {
        id
        name
        type
        url
        updatedAt
      }
      requirementsCount
      employeeRoles {
        id
        role {
          id
        }
        employee {
          id
          number
          firstName
          middleName
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
  query roles($where: RoleWhereInput, $skip: Int, $take: Int, $scan: String, $orderBy: [JSONObject]) {
    roles(where: $where, skip: $skip, take: $take, scan: $scan, orderBy: $orderBy) {
      data {
        id
        name
        numberOfEmployeesRequired
        city
        country
        status
        accepted
        roleDescription
        requirementsCount
        departmentsCount
        employeeRolesCount
      }
      count
      activeRolesCount
      inactiveRolesCount
    }
  }
`;

export default {
  ROLE,
  ROLES,
};
