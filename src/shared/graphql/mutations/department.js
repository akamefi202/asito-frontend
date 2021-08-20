import gql from "graphql-tag";

export const CREATE_UPDATE_DEPARTMENT = gql`
  mutation createDepartment($data: DepartmentWhereInput) {
    createDepartment(data: $data) {
      id
    }
  }
`;

export const CREATE_ROLE_DEPARTMENT = gql`
  mutation createRoleDepartment($createRoleDepartmentData: RoleDepartmentWhereInput) {
    createRoleDepartment(data: $createRoleDepartmentData) {
      id
    }
  }
`;

export const REMOVE_ROLE_DEPARTMENT = gql`
  mutation RemoveRoleDepartment($removeRoleDepartmentData: RoleDepartmentWhereInput) {
    removeRoleDepartment(data: $removeRoleDepartmentData)
  }
`;

export default {
  CREATE_UPDATE_DEPARTMENT,
  CREATE_ROLE_DEPARTMENT,
  REMOVE_ROLE_DEPARTMENT
};
