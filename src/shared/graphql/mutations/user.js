import gql from "graphql-tag";


export const CREATE_UPDATE_USER = gql`
  mutation createUser($data: UserWhereInput) {
    createUser(data: $data) {
      id
      firstName
      lastName
      email
      phone
    }
  }
`;

export default {
  CREATE_UPDATE_USER,
};
