import { Modal } from "antd";

export const onErrorFunction = (content) => {
  Modal.error({
    title: "Something went wrong",
    content,
  });
};
