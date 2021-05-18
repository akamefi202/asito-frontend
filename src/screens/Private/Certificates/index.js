import List from "./List";
import Show from "./Show";
import Form from "./Form";
import { PATHS } from "utils/constants";

const routes = [
  {
    path: PATHS.CERTIFICATES.INDEX,
    exact: true,
    component: List,
  },
  {
    path: PATHS.CERTIFICATES.SHOW,
    exact: true,
    component: Show,
  },
  {
    path: PATHS.CERTIFICATES.CREATE,
    exact: true,
    component: Form,
  },
  {
    path: PATHS.CERTIFICATES.EDIT,
    exact: true,
    component: Form,
  },
];

export default routes;
