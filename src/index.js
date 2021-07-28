/* eslint-disable */
import React from "react";
import { ApolloProvider as ApolloProviderHooks } from "@apollo/react-hooks";
import { ApolloProvider } from "react-apollo";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import client from "./shared/graphql";
import App from "./App";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import "./shared/locales/i18n";
import { ConfigProvider } from 'antd';
import 'moment/locale/nl';
import moment from 'moment';
import locale from "antd/lib/locale/nl_NL";

moment.locale('nl');

const Component = () => (
    <ConfigProvider locale={locale}>
        <ApolloProvider client={client}>
            <ApolloProviderHooks client={client}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ApolloProviderHooks>
        </ApolloProvider>
    </ConfigProvider>
);

const render = () => {
  ReactDOM.render(<Component />, document.getElementById("root"));
};

render();

serviceWorker.unregister();
