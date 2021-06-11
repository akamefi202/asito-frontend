import gql from "graphql-tag";

export const CREATE_UPDATE_DEPARTMENT = gql`
  mutation createDepartment($data: DepartmentWhereInput) {
    createDepartment(data: $data) {
      id
    }
  }
`;


export default {
  CREATE_UPDATE_DEPARTMENT,
};
