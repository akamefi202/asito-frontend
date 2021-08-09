import React from "react";
import "./style.scss"


export const Field =
  ({
     id,
     label,
     customStyleWrapper = '',
     customStyleLabel = '',
     customStyleField = '',
     customStyleLink = '',
     value,
     errors,
     ...props
   }) => {

    return (
      <div id={id} className={`field-wrapper ${customStyleWrapper}`}>
        {label && <div className={`label ${customStyleLabel}`}>{label}</div>}

        {props.href
          ? <a className={customStyleLink} href={props?.href} {...props}>{value || ''}</a>
          : <div className={customStyleField} {...props}>{value || ''}</div>}

        {errors && <p>{errors}</p>}
      </div>
    )
  }
