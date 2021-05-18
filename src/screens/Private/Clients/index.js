import List from "./List";
import Show from "./Show";
import Form from "./Form";
import { PATHS } from "utils/constants";

const routes = [
  {
    path: PATHS.CLIENTS.INDEX,
    exact: true,
    component: List,
  },
  {
    path: PATHS.CLIENTS.SHOW,
    exact: true,
    component: Show,
  },
  {
    path: PATHS.CLIENTS.CREATE,
    exact: true,
    component: Form,
  },
  {
    path: PATHS.CLIENTS.EDIT,
    exact: true,
    component: Form,
  },
];

export default routes;
