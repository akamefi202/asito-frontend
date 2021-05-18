import gql from "graphql-tag";

export const CREATE_OPERATOR = gql`
  mutation createOperator($data: OperatorWhereInput) {
    createOperator(data: $data) {
      id
    }
  }
`;

export const UPDATE_OPERATOR = gql`
  mutation updateOperator($data: OperatorWhereInput) {
    updateOperator(data: $data) {
      id
    }
  }
`;

export default {
  CREATE_OPERATOR,
  UPDATE_OPERATOR
};
