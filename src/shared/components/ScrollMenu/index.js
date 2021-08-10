import React from "react";

export default ({ className = '', menuItems = [] }) => {
  const handleScrollIntoView = (href) => {
    if (document.getElementById(href)) {
      document.getElementById(href).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className={`custom--sider--menu ${className}`}>
      <ul className="custom--sider--menu--items">
        {menuItems.map((item) => (
          <li
            className="custom--sider--menu--items--link"
            key={"scrollMenuKey-" + item.key}
            onClick={() => handleScrollIntoView(item.href)}
          >
            <p>{item.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
