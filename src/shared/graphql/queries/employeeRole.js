import gql from "graphql-tag";

export const EMPLOYEE_ROLE = gql`
  query employeeRole($where: EmployeeRoleWhereInput, $skip: Int, $take: Int) {
    employeeRole(where: $where, skip: $skip, take: $take) {
      id
      role {
        id
        name
        numberOfEmployeesRequired
        city
        country
        status
      }
      employee {
        id
        number
        firstName
        middleName
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

export const EMPLOYEE_ROLES = gql`
  query employeeRoles($where: EmployeeRoleWhereInput, $skip: Int, $take: Int, $scan: String) {
    employeeRoles(where: $where, skip: $skip, take: $take, scan: $scan) {
      data {
        id
        role {
          id
          name
          numberOfEmployeesRequired
          city
          country
          status
        }
        employee {
          id
          number
          firstName
          middleName
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
        hasAccess
        assignedFrom
        assignedUntil
      }
      count
    }
  }
`;

export default {
  EMPLOYEE_ROLE,
  EMPLOYEE_ROLES
};
