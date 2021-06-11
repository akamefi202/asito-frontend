import React, {useEffect} from "react";
import {renderRoutes} from "react-router-config";
import {Switch, withRouter} from "react-router-dom";
import screens from "./../screens";
import ScrollToTop from "./ScrollToTop";
import {useLazyQuery} from "@apollo/react-hooks";
import {UserQueries} from "../shared/graphql/queries";
import {UserStore} from "../shared/store/UserStore"

const {USER} = UserQueries;

const App = () => {
    const token = localStorage.getItem('access_token');
    const [getUser] = useLazyQuery(USER, {
        onCompleted: ({user}) => UserStore(user),
        onError: () => {
            window.localStorage.clear();
            window.location.reload();
        }
    });

    useEffect(() => {
        if (token) getUser();
    }, []);

    return (
        <>
            <ScrollToTop/>
            <Switch>{renderRoutes(screens)}</Switch>
        </>
    );
};

export default withRouter(App);
