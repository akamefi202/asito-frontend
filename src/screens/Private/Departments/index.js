import List from "./List";
import Show from "./Show";
import Form from "./Form";
import { PATHS } from "utils/constants";

const routes = [
  {
    path: PATHS.DEPARTMENTS.INDEX,
    exact: true,
    component: List,
  },
  {
    path: PATHS.DEPARTMENTS.SHOW,
    exact: true,
    component: Show,
  },
  {
    path: PATHS.DEPARTMENTS.CREATE,
    exact: true,
    component: Form,
  },
  {
    path: PATHS.DEPARTMENTS.EDIT,
    exact: true,
    component: Form,
  },
];

export default routes;
