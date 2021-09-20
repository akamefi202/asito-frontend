import { message } from "antd";

export const messages = ({data = "", type = "error", msg = "", duration = 3}) => {
  if (type === "error" && !msg) {
    msg = data.graphQLErrors[0].message ? data.graphQLErrors[0].message : data.message;
  }

  return message[type](msg, duration);
};
