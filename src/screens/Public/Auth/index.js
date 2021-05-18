import { PATHS } from "utils/constants";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Forgot from "./Forgot";
import Verification from "./Verification";

import "./style.scss";
import ResetPassword from "./ResetPassword";

export default [
  {
    path: PATHS.PUBLIC.AUTH.SIGN_IN,
    exact: true,
    component: SignIn,
  },
  {
    path: PATHS.PUBLIC.AUTH.FORGOT,
    exact: true,
    component: Forgot,
  },
  {
    path: PATHS.PUBLIC.AUTH.SIGN_UP,
    exact: true,
    component: SignUp,
  },
  {
    path: PATHS.PUBLIC.AUTH.VERIFICATION,
    exact: true,
    component: Verification,
  },
  {
    path: PATHS.PUBLIC.AUTH.CHANGE_PASSWORD,
    exact: true,
    component: ResetPassword
  }
];
