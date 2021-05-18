import { PATHS } from "utils/constants";
import Show from "./Show";
import Form from "./Form";

const routes = [
  {
    path: PATHS.MYCOMPANY.INDEX,
    exact: true,
    component: Show,
  },
  {
    path: PATHS.MYCOMPANY.EDIT,
    exact: true,
    component: Form,
  },
];

export default routes;
