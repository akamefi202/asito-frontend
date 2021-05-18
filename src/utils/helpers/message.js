import { message } from "antd";

export const messages = ({data = "", type = "error", msg = "", duration = 2}) => {
  if (type === "error" && !msg) {
    msg = data.message;
  }

  return message[type](msg, duration);
};
