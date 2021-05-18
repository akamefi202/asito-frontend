import gql from "graphql-tag";

export const CREATE_ATTACHMENTS = gql`
  mutation createAttachment($data: AttachmentWhereInput) {
    createAttachment(data: $data) {
      id
    }
  }
`;

export default {
    CREATE_ATTACHMENTS
}
