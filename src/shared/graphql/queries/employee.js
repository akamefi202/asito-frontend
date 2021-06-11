import gql from "graphql-tag";

export const EMPLOYEE = gql`
  query employee($where: EmployeeWhereInput) {
    employee(where: $where) {
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
      employeeRoles {
        id
        assignedFrom
        assignedUntil
        role {
          id
        }
      }
    }
  }
`;

export const EMPLOYEES = gql`
  query employees($where: EmployeeWhereInput, $like: EmployeeWhereInput, $scan: String, $skip: Int, $take: Int) {
    employees(where: $where, like: $like, scan: $scan, skip: $skip, take: $take) {
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
        employeeRoles {
          id
          assignedFrom
          assignedUntil
          role {
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
  EMPLOYEE,
  EMPLOYEES,
};
