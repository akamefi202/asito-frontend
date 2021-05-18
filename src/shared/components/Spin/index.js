import React from "react";
import { Spin } from "antd";
import "./style.scss"

export default ({
  children,
  spinning = false,
  tip = "Loading...",
  isLoadApp = false
}) => {
  return (
    <Spin wrapperClassName="custom--spin" className={isLoadApp ? "load-app--spin" : ""} spinning={spinning} tip={tip} >
      {children}
    </Spin>
  );
};
