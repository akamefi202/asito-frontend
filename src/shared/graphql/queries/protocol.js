import gql from "graphql-tag";

export const PROTOCOLS = gql`
  query Protocols($protocolsWhere: ProtocolWhereInput, $scan: String, $skip: Int, $take: Int) {
    protocols(where: $protocolsWhere, scan: $scan, skip: $skip, take: $take) {
      data {
        id
        name
        type
        updatedAt
        createdAt
        url
      }
    }
  }
`;

export const ROLE_PROTOCOLS = gql`
  query RoleProtocols($roleProtocolsWhere: RoleProtocolWhereInput, $skip: Int, $take: Int) {
    roleProtocols(where: $roleProtocolsWhere, skip: $skip, take: $take) {
      data {
        id
        protocol {
          name
          type
          updatedAt
          createdAt
          url   
        }
      }
      count
    }
  }
`;

export default {
    PROTOCOLS,
    ROLE_PROTOCOLS
};
