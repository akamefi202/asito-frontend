import { split } from "apollo-link";
import ApolloLinkTimeout from "apollo-link-timeout";
import { getMainDefinition, hasDirectives } from "apollo-utilities";
import {
  authBffLink,
  AUTH_ANNOTATION,
  PRIVATE_AUTH_ANNOTATION,
} from "./links/authBff.link";
import bffLink from "./links/bff.link";
import { authLink } from "./links/utils";
import WSLink from "./links/ws.link";
const timeoutLink = new ApolloLinkTimeout(30000);

const rootLink = split(
  ({ query }) =>
    hasDirectives([AUTH_ANNOTATION], query) ||
    hasDirectives([PRIVATE_AUTH_ANNOTATION], query),
  timeoutLink.concat(authBffLink),
  timeoutLink.concat(bffLink)
);

const link = split(
  ({ query }) => {
    const { operation } = getMainDefinition(query);
    return operation === "subscription";
  },
  WSLink,
  authLink.concat(rootLink)
);

export default link;
