import gql from "graphql-tag";

export const CREATE_UPDATE_ISSUER = gql`
  mutation createIssuer($data: IssuerWhereInput) {
    createIssuer(data: $data) {
      id
    }
  }
`;

export default {
  CREATE_UPDATE_ISSUER,
};
