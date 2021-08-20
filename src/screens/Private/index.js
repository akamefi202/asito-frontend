import PrivateRoute from "shared/authorization/PrivateRoute";
import { Layout } from "shared/components";
import Home from "./Home";
import Certificates from "./Certificates";
import Functions from "./Functions";
import Departments from "./Departments";
import Employees from "./Employees";
import Preferences from "./Preferences";
import Notifications from "./Notifications";
import Mycompany from "./Mycompany";

const routes = [
  ...Home,
  ...Certificates,
  ...Functions,
  ...Departments,
  ...Employees,
  ...Preferences,
  ...Notifications,
  ...Mycompany,
];

export default routes.map(({ component, layout = true, ...rest }) => {
  return {
    component: () =>
      PrivateRoute({
        component: layout
          ? Layout({
              component,
            })
          : component,
      }),
    ...rest,
  };
});
