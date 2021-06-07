import gql from "graphql-tag";

export const CREATE_UPDATE_OPERATOR = gql`
  mutation updateOperator($data: OperatorWhereInput) {
    updateOperator(data: $data) {
      id
    }
  }
`;

export default {
  CREATE_UPDATE_OPERATOR,
};
