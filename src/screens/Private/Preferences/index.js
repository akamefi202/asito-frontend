import Form from "./Form";
import { PATHS } from "utils/constants";

const routes = [
  {
    path: PATHS.PREFERENCES,
    exact: true,
    component: Form,
  },
];

export default routes;
