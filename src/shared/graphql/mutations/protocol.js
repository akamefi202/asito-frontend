import gql from "graphql-tag";

export const CREATE_ROLE_PROTOCOL = gql`
  mutation CreateRoleProtocol($createRoleProtocolData: RoleProtocolWhereInput) {
    createRoleProtocol(data: $createRoleProtocolData) {
      id
    }
  }
`;

export const REMOVE_ROLE_PROTOCOL = gql`
  mutation RemoveRoleProtocol($data: RoleProtocolWhereInput) {
    removeRoleProtocol(data: $data) {
      id
    }
  }
`;

export default {
  CREATE_ROLE_PROTOCOL,
  REMOVE_ROLE_PROTOCOL
};
