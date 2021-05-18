import React from "react";
import "./style.scss"

const Card = ({ children, cardStyle = "" }) => (
  <div className={`custom--card ${cardStyle}`}>
    <React.Fragment>{children}</React.Fragment>
  </div>
);

export default Card;