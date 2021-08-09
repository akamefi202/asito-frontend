import CertificateList from "./CertificateList";
import {CreateCertificate} from "./CreateCertificate";
import {ShowCertificate} from "./ShowCertificate";
import {PATHS} from "utils/constants";

const routes = [
  {
    path: PATHS.CERTIFICATES.INDEX,
    exact: true,
    component: CertificateList,
  },
  {
    path: PATHS.CERTIFICATES.SHOW,
    exact: true,
    component: ShowCertificate
  },
  {
    path: PATHS.CERTIFICATES.CREATE,
    exact: true,
    component: CreateCertificate,
  }
];

export default routes;
