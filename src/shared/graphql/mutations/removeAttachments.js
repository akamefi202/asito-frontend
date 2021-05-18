import gql from "graphql-tag";

export const REMOVE_ATTACHMENTS = gql`
  mutation removeAttachment($data: AttachmentWhereInput) {
    removeAttachment(data: $data)
  }
`;

export default {
    REMOVE_ATTACHMENTS
};
