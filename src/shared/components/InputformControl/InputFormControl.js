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

    const onChangeHandler = (e) => {
      const event = Object.assign(e);
      event.target.value = event.target.value.trimStart();
      onChange(event);
    }

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
          onChange={onChangeHandler}
          {...props}/>

        {touched && errors && <p>{errors}</p>}
      </div>
    )
  }
