import gql from "graphql-tag";

export const CREATE_FILE = gql`
  mutation createFile($data: FileWhereInput) {
    createFile(data: $data)
  }
`;

export default {
    CREATE_FILE,
};
