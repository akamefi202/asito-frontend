import { RolesList } from './RolesList';
import Show from "./Show";
import Form from "./Form";
import { PATHS } from "utils/constants";

const routes = [
  {
    path: PATHS.ROLES.INDEX,
    exact: true,
    component: RolesList,
  },
  {
    path: PATHS.ROLES.SHOW,
    exact: true,
    component: Show,
  },
  {
    path: PATHS.ROLES.CREATE,
    exact: true,
    component: Form,
  },
  {
    path: PATHS.ROLES.EDIT,
    exact: true,
    component: Form,
  },
];

export default routes;
