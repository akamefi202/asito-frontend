import React from "react";
import {Input} from 'antd';
import "./style.scss"

export const InputFormControl =
  ({
     id,
     type = 'input',
     customStyleWrapper = '',
     customStyleInput = '',
     customStyleLabel = '',
     label,
     placeholder,
     value,
     loading,
     disabled,
     size = 'large',
     touched,
     errors,
     onChange,
     ...props
   }) => {

    return (
      <div className={`form-input-wrapper ${customStyleWrapper} ${touched && errors ? 'error' : ''}`}>
        {label && <div className={`label ${customStyleLabel}`}>{label}</div>}

        <Input id={id}
          type={type}
          className={`input ${customStyleInput} ${touched && errors ? 'error' : ''}`}
          placeholder={placeholder}
          value={value}
          loading={loading}
          disabled={disabled}
          onChange={onChange}
          {...props}/>

        {touched && errors && <p>{errors}</p>}
      </div>
    )
  }
