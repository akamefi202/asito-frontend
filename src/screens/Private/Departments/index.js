import List from "./List";
import Show from "./Show";
import Form from "./Form";
import { PATHS } from "utils/constants";

const routes = [
  {
    path: PATHS.DEPARTAMENTS.INDEX,
    exact: true,
    component: List,
  },
  {
    path: PATHS.DEPARTAMENTS.SHOW,
    exact: true,
    component: Show,
  },
  {
    path: PATHS.DEPARTAMENTS.CREATE,
    exact: true,
    component: Form,
  },
  {
    path: PATHS.DEPARTAMENTS.EDIT,
    exact: true,
    component: Form,
  },
];

export default routes;
