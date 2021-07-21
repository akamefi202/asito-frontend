import gql from "graphql-tag";

export const CREATE_UPDATE_EMPLOYEE = gql`
  mutation createEmployee($data: EmployeeWhereInput) {
    createEmployee(data: $data) {
      id
    }
  }
`;

export default {
  CREATE_UPDATE_EMPLOYEE,
};
