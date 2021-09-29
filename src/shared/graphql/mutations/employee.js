import gql from "graphql-tag";

export const CREATE_EMPLOYEE = gql`
  mutation createEmployee($data: EmployeeWhereInput) {
    createEmployee(data: $data) {
      id
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee($data: EmployeeWhereInput) {
    updateEmployee(data: $data) {
      id
    }
  }
`;

export default {
  CREATE_EMPLOYEE,
  UPDATE_EMPLOYEE
};
