import gql from "graphql-tag";

export const CREATE_CERTIFICATE = gql`
  mutation createCertificate($data: CertificateWhereInput) {
    createCertificate(data: $data) {
      id
    }
  }
`;

export const UPDATE_CERTIFICATE = gql`
  mutation updateCertificate($data: CertificateWhereInput) {
    updateCertificate(data: $data) {
      id
    }
  }
`;

export default {
  CREATE_CERTIFICATE,
  UPDATE_CERTIFICATE
};
