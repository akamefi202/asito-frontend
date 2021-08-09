import {ShowEmployees} from "./ShowEmployees";
import {EditEmployees} from "./EditEmployees";
import {EmployeesList} from './EmployeesList'
import {PATHS} from "utils/constants";

const routes = [
  {
    path: PATHS.EMPLOYEES.INDEX,
    exact: true,
    component: EmployeesList,
  },
  {
    path: PATHS.EMPLOYEES.SHOW,
    exact: true,
    component: ShowEmployees,
  },
  {
    path: PATHS.EMPLOYEES.CREATE,
    exact: true,
    component: EditEmployees,
  },
  {
    path: PATHS.EMPLOYEES.EDIT,
    exact: true,
    component: EditEmployees,
  },
];

export default routes;
