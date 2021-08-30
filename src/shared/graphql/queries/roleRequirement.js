import gql from "graphql-tag";

export const ROLE_REQUIREMENTS = gql`
  query RoleRequirements($roleRequirementsWhere: RoleRequirementWhereInput, $scan: String, $skip: Int, $take: Int, $orderBy: [JSONObject]) {
    roleRequirements(where: $roleRequirementsWhere, scan: $scan, skip: $skip, take: $take, orderBy: $orderBy) {
      data {
        id
        role {
          id
        }
        requirement {
          id
          type
        }
        validAtLeastUntil
      }
      count
    }
  }
`;

export default {
  ROLE_REQUIREMENTS
};
