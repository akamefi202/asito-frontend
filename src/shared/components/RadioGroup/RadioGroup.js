import React from "react";
import "./style.scss"
import {Radio} from "antd";


export const RadioGroup =
  ({
     id,
     customStyleWrapper = '',
     customStyleLabel = '',
     customStyleGroup = '',
     customStyleRadio = '',
     label,
     value,
     defaultValue,
     optionValue = 'id',
     optionTitle = 'value',
     items,
     size = 'large',
     optionType,
     disabled,
     errors,
     onChange
   }) => {

    return (
      <div className={`radio-group-wrapper ${customStyleWrapper}`}>
        {label && <div className={`label ${customStyleLabel}`}>{label}</div>}

        <Radio.Group id={id}
          className={`radio-group ${customStyleGroup}`}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          size={size}
          optionType={optionType}
          onChange={onChange}>

          {items.map(item =>
            <Radio className={`radio ${customStyleRadio}`}
              key={'key-' + item?.[optionValue]}
              value={item?.[optionValue]}>
              {item?.[optionTitle] || ''}
            </Radio>
          )}

        </Radio.Group>

        {errors && <p>{errors}</p>}
      </div>
    )
  }
