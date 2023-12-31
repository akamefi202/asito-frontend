import gql from "graphql-tag";

export const CERTIFICATE = gql`
  query Certificate($where: CertificateWhereInput) {
    certificate(where: $where) {
      id
      signedBy
      signerTitle
      number
      issuedOn
      validUntil
      requirement {
        id
        type
        validAtLeastUntil
      }
      attachments {
            id
            name
            type
            certificate {
              id
            }
            updatedAt
      }
      employee {
        id
        email
        number
        firstName
        middleName
        lastName
        address1
        address2
        city
        country
        dateOfBirth
        gender
        phone
        zipCode
      }
      issuer {
        id
        name
        number
        address1
        address2
        zipCode
        city
        country
        kind
        phone
        email
        website
      }
    }
  }
`;

export const CERTIFICATES = gql`
  query Certificates($where: CertificateWhereInput, $scan: String, $lt: CertificateWhereInput, $gt: CertificateWhereInput, $skip: Int, $take: Int, $orderBy: [JSONObject]) {
    certificates(where: $where, scan: $scan, skip: $skip, take: $take, lt: $lt, gt: $gt, orderBy: $orderBy) {
      data {
        id
        signedBy
        signerTitle
        number
        issuedOn
        validUntil
        requirement {
          id
          type
          validAtLeastUntil
        }
        attachments {
            id
            name
            type
            updatedAt
        }
        employee {
          id
          firstName
          middleName
          lastName
        }
      }
      count
      allCertsCount
      validCertsCount
      expiredCertsCount
    }
  }
`;

export const CERTIFICATE_TYPES = gql`
  query Requirements($where: RequirementWhereInput, $scan: String, $lt: RequirementWhereInput, $gt: RequirementWhereInput, $skip: Int, $take: Int, $orderBy: [JSONObject]) {
    requirements(where: $where, scan: $scan, skip: $skip, take: $take, lt: $lt, gt: $gt, orderBy: $orderBy) {
        data {
            id
            type
            validAtLeastUntil
        }
        count
    }
  }
`;

export default {
    CERTIFICATE,
    CERTIFICATES,
    CERTIFICATE_TYPES
};
