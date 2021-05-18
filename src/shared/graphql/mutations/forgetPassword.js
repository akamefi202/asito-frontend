import gql from "graphql-tag";

export const FORGET_PASSWORD = gql`
  mutation forgetPassword($data: InputForgetPassword) {
    forgetPassword(data: $data) @authBff
  }
`;

export default {
    FORGET_PASSWORD,
};
