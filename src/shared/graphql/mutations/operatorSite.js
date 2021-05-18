import gql from "graphql-tag";

export const UPDATE_CREATE_OPERATOR_SITE = gql`
  mutation createOperatorSite($data: OperatorSiteWhereInput) {
    createOperatorSite(data: $data) {
      id
    }
  }
`;

export const REMOVE_OPERATOR_SITE = gql`
  mutation removeOperatorSite($data: OperatorSiteWhereInput) {
    removeOperatorSite(data: $data)
  }
`;

export default {
    UPDATE_CREATE_OPERATOR_SITE,
    REMOVE_OPERATOR_SITE
};
