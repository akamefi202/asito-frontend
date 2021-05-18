import React from "react";
import { DatePicker } from "antd";
import moment from "moment";
import "./style.scss"

export default ({
  placeholder,
  errors,
  format = "DD-MM-YYYY",
  value,
  touched,
  custom = "",
  onChange = () => {},
  ...rest
}) => {
  const getValue = (date) => isNaN(date) ? moment(date) : moment(parseInt(date, 10));

  return (
    <div className={`custom-picker ${custom}`}>
      <DatePicker
        className={touched && errors ? 'error' : ''}
        format={format}
        value={value && getValue(value)}
        placeholder={placeholder}
        onChange={(date) => {
          onChange(date ? date.format().toString() : "");
        }}
        {...rest}
      />
      {touched && <p>{errors}</p>}
    </div>
  );
};
