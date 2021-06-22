import gql from "graphql-tag";

export const DEVICE = gql`
  query Device($where: DeviceWhereInput) {
    device(where: $where) @authBff {
      id
      access {
        id
      }
    }
  }
`;

export const ACCESS = gql`
  query Access($where: AccessWhereInput) {
    access(where: $where) @authBff {
      id
      device {
        id
        guid
      }
    }
  }
`;

export const USER_AUTH = gql`
  query User($where: UserWhereInput) {
    user(where: $where) @authBff {
      id
      username
      password
      email
      phone
    }
  }
`;

export const ACCESSES = gql`
  query accesses($where: AccessWhereInput) {
    accesses(where: $where) @authBff {
      data {
        id
        user {
          id
          username
        }
        device {
          id
          guid
        }
      }
    }
  }
`;

export const DEVICES = gql`
  query devices($where: DeviceWhereInput) {
    devices(where: $where) @authBff {
      data {
        guid
        access {
          id
        }
      }
    }
  }
`;

export const USERS_AUTH = gql`
  query users($where: UserWhereInput) {
    users(where: $where) @authBff {
      data {
        id
        username
      }
    }
  }
`;

export default {
  DEVICE,
  USER_AUTH,
  USERS_AUTH,
  ACCESS,
  ACCESSES,
  DEVICES,
};
