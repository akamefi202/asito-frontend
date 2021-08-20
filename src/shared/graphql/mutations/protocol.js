import gql from "graphql-tag";

export const CREATE_PROTOCOL = gql`
  mutation CreateProtocol($createProtocolData: ProtocolWhereInput) {
    createProtocol(data: $createProtocolData) {
      id
    }
  }
`;

export const REMOVE_PROTOCOL = gql`
  mutation RemoveProtocol($data: ProtocolWhereInput) {
    removeProtocol(data: $data)
  }
`;

// mutation CreateProtocolMutation($createProtocolData: ProtocolWhereInput) {
//   createProtocol(data: $createProtocolData) {
//     id
//   }
// }

export const CREATE_ROLE_PROTOCOL = gql`
  mutation CreateRoleProtocol($createRoleProtocolData: RoleProtocolWhereInput) {
    createRoleProtocol(data: $createRoleProtocolData) {
      id
    }
  }
`;

export const REMOVE_ROLE_PROTOCOL = gql`
  mutation RemoveRoleProtocol($data: RoleProtocolWhereInput) {
    removeRoleProtocol(data: $data)
  }
`;

export default {
  CREATE_ROLE_PROTOCOL,
  REMOVE_ROLE_PROTOCOL,
  CREATE_PROTOCOL,
  REMOVE_PROTOCOL
};
