import List from "./List";
import Show from "./Show";
import Form from "./Form";
import { PATHS } from "utils/constants";

const routes = [
  {
    path: PATHS.SITES.INDEX,
    exact: true,
    component: List,
  },
  {
    path: PATHS.SITES.SHOW,
    exact: true,
    component: Show,
  },
  {
    path: PATHS.SITES.CREATE,
    exact: true,
    component: Form,
  },
  {
    path: PATHS.SITES.EDIT,
    exact: true,
    component: Form,
  },
];

export default routes;
