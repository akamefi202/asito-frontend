import gql from "graphql-tag";

export const ACCESSES = gql `
  query Accesses($where: AccessWhereInput, $skip: Int, $take: Int) {
    accesses(where: $where, skip: $skip, take: $take) {
    data {
        id
        sharedOn
        sharedUntil
        client {
          id
          name
        }
      }
      count
    }
  }
`;

export default {
    ACCESSES
};
