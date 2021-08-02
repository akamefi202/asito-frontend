import gql from "graphql-tag";

export const CREATE_UPDATE_ROLE = gql`
  mutation createRole($data: RoleWhereInput) {
    createRole(data: $data) {
      id
      accepted
      name
      departments {
        id
      }
      protocols {
        id
      }
      requirements {
        id
        type
        validAtLeastUntil
      }
      employeeRoles {
        role {
          id
        }
        employee {
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
  CREATE_UPDATE_ROLE,
};
