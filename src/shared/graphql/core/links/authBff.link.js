/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
import { Observable, ApolloLink } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";
import {
  checkDocument,
  removeDirectivesFromDocument,
  hasDirectives,
} from "apollo-utilities";
import { authApiUrl } from "config";
import { updateOperationHeader } from "./utils";

export const AUTH_ANNOTATION = "authBff";
export const PRIVATE_AUTH_ANNOTATION = "privateAuthBff";

const sanitizedQueryCache = new Map();
const authLink = createUploadLink({ uri: authApiUrl });

const getQueryFromCache = (query) => {
  let sanitizedQuery = sanitizedQueryCache[JSON.stringify(query)];
  if (!sanitizedQuery) {
    checkDocument(query);
    sanitizedQuery = removeDirectivesFromDocument(
      [{ name: AUTH_ANNOTATION }, { name: PRIVATE_AUTH_ANNOTATION }],
      query
    );
    sanitizedQueryCache[JSON.stringify(query)] = sanitizedQuery;
  }
  return sanitizedQuery;
};

const AuthBffInterceptor = () =>
  new ApolloLink(
    (operation, forward) =>
      new Observable(async (observer) => {
        const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token");
        if (hasDirectives([PRIVATE_AUTH_ANNOTATION], operation.query)) {
          updateOperationHeader(operation, token);
        }
        operation.query = getQueryFromCache(operation.query);
        forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
  );

export const authBffLink = ApolloLink.from([AuthBffInterceptor(), authLink]);
