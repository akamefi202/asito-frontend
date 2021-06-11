import gql from "graphql-tag";

export const CREATE_UPDATE_EMPLOYEE = gql`
  mutation updateEmployee($data: EmployeeWhereInput) {
    updateEmployee(data: $data) {
      id
    }
  }
`;

export default {
  CREATE_UPDATE_EMPLOYEE,
};
