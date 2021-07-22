import gql from "graphql-tag";

export const DEPARTMENT = gql`
  query department($where: DepartmentWhereInput) {
    department(where: $where) {
      id
      name
      number
      registrationNumber
      vat
      location
      address
      zipCode
      city
      country
      phone
      email
      webrole
      roles {
        id
        status
        departmentId
        name
        numberOfEmployeesRequired
        latitude
        longitude
        address1
        address2
        zipCode
        city
        country
        employeeRoles {
          employee {
            id
            firstName
            lastName
          }
        }
      }
    }
  }
`;

export const DEPARTMENTS = gql`
  query departments($scan: String, $where: DepartmentWhereInput, $skip: Int, $take: Int) {
    departments(scan: $scan, where: $where, skip: $skip, take: $take) {
      data {
        id
        name
        number
        registrationNumber
        vat
        location
        address
        zipCode
        city
        country
        phone
        email
        webrole
        roles {
          id
        }
      }
      count
    }
  }
`;

export default {
  DEPARTMENT,
  DEPARTMENTS,
};
