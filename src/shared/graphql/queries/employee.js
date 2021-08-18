import gql from "graphql-tag";

export const EMPLOYEE = gql`
  query employee($where: EmployeeWhereInput) {
    employee(where: $where) {
      id
      wallet
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
          name
          accepted
        }
      }
    }
  }
`;

export const EMPLOYEES = gql`
  query employees($where: EmployeeWhereInput, $like: EmployeeWhereInput, $scan: String, $skip: Int, $take: Int, $orderBy: [JSONObject]) {
    employees(where: $where, like: $like, scan: $scan, skip: $skip, take: $take, orderBy: $orderBy) {
      data {
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
        }
        employeeRoles {
          id
          assignedFrom
          assignedUntil
          role {
            id
            name
            protocols {
              id
              name
              type
              url
              updatedAt
            }
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
