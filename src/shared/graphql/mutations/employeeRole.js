import gql from "graphql-tag";

export const UPDATE_CREATE_EMPLOYEE_ROLE = gql`
  mutation createEmployeeRole($data: EmployeeRoleWhereInput) {
    createEmployeeRole(data: $data) {
      id
    }
  }
`;

export const REMOVE_EMPLOYEE_ROLE = gql`
  mutation removeEmployeeRole($data: EmployeeRoleWhereInput) {
    removeEmployeeRole(data: $data)
  }
`;

export default {
  UPDATE_CREATE_EMPLOYEE_ROLE,
  REMOVE_EMPLOYEE_ROLE
};
