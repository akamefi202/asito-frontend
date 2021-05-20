import List from "./List";
import Show from "./Show";
import Form from "./Form";
import { PATHS } from "utils/constants";

const routes = [
  {
    path: PATHS.PERSONNELS.INDEX,
    exact: true,
    component: List,
  },
  {
    path: PATHS.PERSONNELS.SHOW,
    exact: true,
    component: Show,
  },
  {
    path: PATHS.PERSONNELS.CREATE,
    exact: true,
    component: Form,
  },
  {
    path: PATHS.PERSONNELS.EDIT,
    exact: true,
    component: Form,
  },
];

export default routes;
