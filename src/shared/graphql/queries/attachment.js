import gql from "graphql-tag";

export const ATTACHMENTS = gql`
  query Attachments($where: AttachmentWhereInput, $scan: String, $skip: Int, $take: Int) {
    attachments(where: $where, scan: $scan, skip: $skip, take: $take) {
      data {
        id
        name
        type
        updatedAt
        createdAt
        url
      }
    }
  }
`;

export default {
    ATTACHMENTS
};
