import gql from "graphql-tag";

export const SIGNUP = gql`
  mutation signup($data: UserWhereInput) {
    signup(data: $data) @authBff {
      accessToken
      refreshToken
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($data: InputUserAuth) {
    signin(data: $data) @authBff {
      accessToken
      refreshToken
    }
  }
`;

export const CREATE_DEVICE = gql`
  mutation CreateDevice($data: DeviceWhereInput) {
    createDevice(data: $data) @authBff {
      id
      guid
    }
  }
`;

export const CREATE_ACCESS = gql`
  mutation CreateAccess($data: AccessWhereInput) {
    createAccess(data: $data) @authBff {
      id
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($data: InputPaswordUpdated) {
    changePassword(data: $data) @authBff {
      accessToken
      refreshToken
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($data: UserWhereInput) {
    updateUser(data: $data) @authBff {
      id
    }
  }
`;

export const GENERATE_PIN_CODE = gql`
  mutation GeneratePhonePinForChangingPassword($data: UserWhereInput) {
    generatePhonePinForChangingPassword(data: $data) @authBff
  }
`;
export const CHANGE_PASSWORD_AFTER_VALIDATION = gql`
  mutation ChangePasswordAfterValidation(
    $data: InputChangePasswordAfterValidation
  ) {
    changePasswordAfterValidation(data: $data) @authBff
  }
`;

export const VERIFY_EMAIL = gql`
  mutation verifyEmail($data: InputEmailVerification) {
    verifyEmail(data: $data) @authBff
  }
`;

export const RESND_EMAIL_VERIFICATION = gql`
  mutation resendEmailVerification {
    resendEmailVerification @authBff
  }
`;

export default {
  SIGNUP,
  VERIFY_EMAIL,
  LOGIN_MUTATION,
  CREATE_DEVICE,
  CREATE_ACCESS,
  UPDATE_USER,
  CHANGE_PASSWORD,
  GENERATE_PIN_CODE,
  CHANGE_PASSWORD_AFTER_VALIDATION,
  RESND_EMAIL_VERIFICATION,
};
