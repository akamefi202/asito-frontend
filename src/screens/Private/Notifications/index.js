import List from "./List";
import { PATHS } from "utils/constants";

const routes = [
  {
    path: PATHS.NOTIFICATIONS.INDEX,
    exact: true,
    component: List,
  },
];

export default routes;
