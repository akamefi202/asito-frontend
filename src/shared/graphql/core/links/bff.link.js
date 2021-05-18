/* eslint-disable implicit-arrow-linebreak */
import { createUploadLink } from "apollo-upload-client";
import { ApolloLink, Observable } from "apollo-link";
import { apiUrl } from "config";
import { updateOperationHeader } from "./utils";

const uploadedBffLink = createUploadLink({ uri: apiUrl });

const TokenInterceptor = () =>
  new ApolloLink(
    (operation, forward) =>
      new Observable((observer) => {
        const token = localStorage.getItem("access_token");
        if (token) {
          updateOperationHeader(operation, token);
        }
        forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
  );

const bffLink = ApolloLink.from([TokenInterceptor(), uploadedBffLink]);

export default bffLink;
