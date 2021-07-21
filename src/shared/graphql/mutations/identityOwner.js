import gql from "graphql-tag";

export const IDENTITY_OWNER = gql`
  mutation VerifyMutation($data: IdentityOwnerWhereInput) {
    verify(data: $data)
  }
`;

export default {
  IDENTITY_OWNER
};