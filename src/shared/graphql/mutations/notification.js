import gql from "graphql-tag";

export const CREATE_UPDATE_NOTIFICATION = gql`
  mutation createNotification($data: NotificationWhereInput) {
    createNotification(data: $data) {
      id
    }
  }
`;

export default {
    CREATE_UPDATE_NOTIFICATION
}
