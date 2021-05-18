import PublicRoute from "shared/authorization/PublicRoute";
import Auth from "./Auth";

const routes = [...Auth];

export default routes.map(({ component, ...rest }) => {
  return {
    component: () =>
      PublicRoute({
        component,
      }),
    ...rest,
  };
});
