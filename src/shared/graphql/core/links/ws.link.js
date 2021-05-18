/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
import { WebSocketLink } from "apollo-link-ws";
import { wsUrl } from "config";

const wsLink = new WebSocketLink({
  uri: wsUrl,
  options: {
    reconnect: true,
  },
});

const subscriptionMiddleware = {
  applyMiddleware: async (options, next) => {
    const token = localStorage.getItem("access_token");
    options.authorization = `Bearer ${token}`;
    next();
  },
};

export default wsLink.subscriptionClient.use([subscriptionMiddleware]);
