import gql from "graphql-tag";

export const NOTIFICATIONS = gql`
  query notifications ($where: NotificationWhereInput, $skip: Int, $take: Int) {
    notifications(where: $where, skip: $skip, take: $take) {
        data {
            id
            title
            body
            read
            resource
            event
        }
        count
    }
  }
`;

export const SUBSCRIBE_NOTIFICATION = gql`
  subscription notificationAdded ($where: NotificationWhereInput) {
    notificationAdded(where: $where) {
      id
    }
  }
`;

export default {
    NOTIFICATIONS,
    SUBSCRIBE_NOTIFICATION
};
