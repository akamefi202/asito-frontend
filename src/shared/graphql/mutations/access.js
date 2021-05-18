import gql from "graphql-tag";

export const CREATE_UPDATE_ACCESSES = gql`
  mutation createAccess($data: AccessWhereInput) {
    createAccess(data: $data) {
      id
    }
  }
`;

export const REMOVE_ACCESS = gql`
  mutation removeAccess($data: AccessWhereInput) {
    removeAccess(data: $data)
  }
`;

export default {
    CREATE_UPDATE_ACCESSES,
    REMOVE_ACCESS
};
