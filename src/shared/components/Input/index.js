import React from "react";
import "./style.scss"

export default ({
  icon,
  placeholder,
  errors,
  value,
  touched,
  iconRight,
  custom = '',
  onChange = () => {},
  ...rest
}) => {
  return (
    <div className="custom-input">
      <div className={`input-wrapper ${custom} ${touched && errors ? 'error' : ''}`}>
        {!iconRight && icon}
        <input
          value={value}
          className={"input-element"}
          placeholder={placeholder}
          onChange={e => {
            onChange(e.target.value);
          }}
          {...rest}
        />
        {iconRight && icon}
      </div>
      {touched && <p>{errors}</p>}
    </div>
  );
};
