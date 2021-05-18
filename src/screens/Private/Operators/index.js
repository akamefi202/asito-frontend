import List from "./List";
import Show from "./Show";
import Form from "./Form";
import { PATHS } from "utils/constants";

const routes = [
  {
    path: PATHS.OPERATORS.INDEX,
    exact: true,
    component: List,
  },
  {
    path: PATHS.OPERATORS.SHOW,
    exact: true,
    component: Show,
  },
  {
    path: PATHS.OPERATORS.CREATE,
    exact: true,
    component: Form,
  },
  {
    path: PATHS.OPERATORS.EDIT,
    exact: true,
    component: Form,
  },
];

export default routes;
