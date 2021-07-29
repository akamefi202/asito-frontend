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

export default {
    PROTOCOLS
};