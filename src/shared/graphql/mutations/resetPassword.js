import gql from "graphql-tag";

export const RESET_PASSWORD = gql`
  mutation resetPassword($data: InputResetPassword) {
    resetPassword(data: $data) @authBff
  }
`;

export const VERIFY_RESET_PASSWORD_LINK = gql`
  mutation verifyResetPasswordLink($data: InputVerifyResetPasswordLink) {
    verifyResetPasswordLink(data: $data) @authBff
  }
`;

export default {
    RESET_PASSWORD,
    VERIFY_RESET_PASSWORD_LINK
};
