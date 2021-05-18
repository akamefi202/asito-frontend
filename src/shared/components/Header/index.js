import React from "react";
import { Breadcrumb } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Button } from "shared/components";
import { Link } from "react-router-dom";

export default ({ items = [], buttons = [] }) => {
  return (
    <div className="heading--area p-left-20 ">
      <Breadcrumb separator={<RightOutlined />} className="custom--breadcrumb">
        {items.map((item, index) => (
          <Breadcrumb.Item key={index} className={item.className}>
            {item.href ? (
              <Link key={"link-" + index} to={item.href}>
                {item.title}
              </Link>
            ) : (
              item.title
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <div className="heading--area--buttons">
        {buttons.map((item, index) => (
          <Button
            key={index}
            type={item.type || ''}
            disabled={item.disabled}
            buttonStyle={item.buttonStyle}
            custom={item.custom}
            onClick={item.action}
          >
            {item.icon} {item.title}
          </Button>
        ))}
      </div>
    </div>
  );
};
