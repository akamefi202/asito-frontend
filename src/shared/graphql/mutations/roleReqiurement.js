import gql from "graphql-tag";

export const CREATE_ROLE_REQUIREMENT = gql`
  mutation CreateRoleRequirementMutation($createRoleRequirementData: RoleRequirementWhereInput) {
    createRoleRequirement(data: $createRoleRequirementData) {
      id
    }
  }
`;

export const UPDATE_ROLE_REQUIREMENT = gql`
  mutation UpdateRoleRequirementMutation($updateRoleRequirementData: RoleRequirementWhereInput) {
    updateRoleRequirement(data: $updateRoleRequirementData) {
      id
    }
  }
`;

export const REMOVE_ROLE_REQUIREMENT = gql`
  mutation RemoveRoleRequirement($data: RoleRequirementWhereInput) {
    removeRoleRequirement(data: $data)
  }
`;


export default {
  CREATE_ROLE_REQUIREMENT,
  UPDATE_ROLE_REQUIREMENT,
  REMOVE_ROLE_REQUIREMENT
};
