import gql from "graphql-tag";

export const CREATE_UPDATE_CLIENT = gql`
  mutation createClient($data: ClientWhereInput) {
    createClient(data: $data) {
      id
    }
  }
`;


export default {
  CREATE_UPDATE_CLIENT,
};
