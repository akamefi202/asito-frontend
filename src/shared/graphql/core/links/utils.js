/* eslint-disable max-len */
import { setContext } from "apollo-link-context";

export const updateOperationHeader = (operation, accessToken) =>
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${accessToken}`
    }
  }));

export const onError = observer => ({
  next: observer.next.bind(observer),
  error: observer.error.bind(observer),
  complete: observer.complete.bind(observer)
});

export const authLink = setContext(async (_, { headers }) => {
  const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});
