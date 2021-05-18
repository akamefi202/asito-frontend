import React from "react";
import {Redirect, Route} from "react-router-dom";
import {PATHS} from "../../utils/constants";
import {UserStore} from "../store/UserStore";
import {useReactiveVar} from "@apollo/client";
import {Spin} from "../components";
import {USER_ROLES} from "../constants/userRoles";
import * as UrlPattern from "url-pattern";

const PrivateRoute = ({component: Component, ...rest}) => {
    localStorage.getItem('auth_token') && localStorage.removeItem('auth_token');
    const accessToken = localStorage.getItem("access_token");
    const user = useReactiveVar(UserStore);
    const userRole = user && user.issuer && user.issuer.kind ? user.issuer.kind : null;

    const checkRole = (rootRoute, currentRoute) => {
        return USER_ROLES[userRole] && USER_ROLES[userRole].access.some(route => {
            const pattern = new UrlPattern(route);
            return !!pattern.match(currentRoute);
        });
    }

    const getDefaultRoute = () => {
        if (!USER_ROLES[userRole]) {
            localStorage.removeItem('access_token');
            return PATHS.PUBLIC.AUTH.SIGN_IN;
        }
        const route = USER_ROLES[userRole].access[0];
        return route.INDEX ? route.INDEX : route;
    }

    return (
        <Route
            {...rest}
            render={(props) => {
                const route = props.location.pathname;
                const rootRoute = route.substr(1).split("/")[0];
                if (!accessToken) return <Redirect to={PATHS.PUBLIC.AUTH.SIGN_IN}/>;
                return user ?
                    accessToken && rootRoute && checkRole(rootRoute, props.location.pathname)
                        ? <Component {...props} />
                        : <Redirect to={accessToken && userRole ? getDefaultRoute() : PATHS.PUBLIC.AUTH.SIGN_IN}/>
                    : <Spin spinning={true} isLoadApp={true}/>
            }}
        />
    );
};
export default PrivateRoute;
