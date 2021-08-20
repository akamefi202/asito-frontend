import gql from "graphql-tag";

export const DEPARTMENT = gql`
  query department($where: DepartmentWhereInput) {
    department(where: $where) {
      id
      name
      number
      type
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
  query departments($scan: String, $where: DepartmentWhereInput, $skip: Int, $take: Int, $orderBy: [JSONObject]) {
    departments(scan: $scan, where: $where, skip: $skip, take: $take, orderBy: $orderBy) {
      data {
        id
        name
        number
        type
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

export const ROLE_DEPARTMENTS = gql`
  query RoleDepartments($roleDepartmentsWhere: RoleDepartmentWhereInput, $skip: Int, $take: Int) {
    roleDepartments(where: $roleDepartmentsWhere, skip: $skip, take: $take) {
      data {
        id
        department {
          id
          name
          type
          location
        }
      }
      count
    }
  }
`;

export default {
  DEPARTMENT,
  DEPARTMENTS,
  ROLE_DEPARTMENTS,
};
