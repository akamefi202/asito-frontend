import List from "./List";
import Show from "./Show";
import Form from "./Form";
import { PATHS } from "utils/constants";

const routes = [
  {
    path: PATHS.EMPLOYEES.INDEX,
    exact: true,
    component: List,
  },
  {
    path: PATHS.EMPLOYEES.SHOW,
    exact: true,
    component: Show,
  },
  {
    path: PATHS.EMPLOYEES.CREATE,
    exact: true,
    component: Form,
  },
  {
    path: PATHS.EMPLOYEES.EDIT,
    exact: true,
    component: Form,
  },
];

export default routes;
