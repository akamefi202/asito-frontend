import React from "react";
import {DatePicker} from "antd";
import "./style.scss"
import moment from "moment";

export const DatePickerFormControl =
  ({
     id,
     customStyleWrapper = '',
     customStyleDatePicker = '',
     customStyleLabel = '',
     label,
     placeholder,
     value,
     size = 'large',
     mode,
     format = 'DD-MM-YYYY',
     defaultPickerValue,
     disabledDate,
     disabled,
     touched,
     errors,
     onChange,
     ...props
   }) => {

    const getValue = (date) => isNaN(date) ? moment(date) : moment(parseInt(date, 10));

    return (
      <div className={`form-date-picker-wrapper ${customStyleWrapper} ${touched && errors ? 'error' : ''}`}>
        {label && <div className={`label ${customStyleLabel}`}>{label}</div>}

        <DatePicker id={id}
          className={`${customStyleDatePicker} ${touched && errors ? 'error' : ''}`}
          placeholder={placeholder}
          value={value && getValue(value)}
          size={size}
          mode={mode}
          format={format}
          defaultPickerValue={defaultPickerValue}
          disabledDate={disabledDate}
          disabled={disabled}
          onChange={date => onChange(date?.format()?.toString() || '')}
          {...props}/>

        {touched && errors && <p>{errors}</p>}
      </div>
    )
  }
