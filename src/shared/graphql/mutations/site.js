import gql from "graphql-tag";

export const CREATE_UPDATE_SITE = gql`
  mutation createSite($data: SiteWhereInput) {
    createSite(data: $data) {
      id
      operatorSites {
        site {
          id
        }
        operator {
          number
          firstName
          lastName
          certificates {
            id
          }
        }
      }
    }
  }
`;

export default {
  CREATE_UPDATE_SITE,
};
