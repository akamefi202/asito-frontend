import React from 'react';
import {Select} from 'antd';
import './style.scss'
import {useTranslation} from "react-i18next";

const {Option} = Select;

export const SelectFormControl =
  ({
     id,
     customStyleWrapper = '',
     customStyleLabel = '',
     customStyleSelect = '',
     customDropdownStyle = '',
     customStyleOptions = '',
     icon,
     label,
     placeholder,
     mode,
     size = 'large',
     value,
     items,
     maxTagCount,
     loading,
     disabled,
     isClearable,
     touched,
     errors,
     optionValue = 'id',
     optionTitle = 'value',
     disabledOptions = [],
     filterOption,
     filterSort,
     onChange,
     onSearch,
     onScroll,
     ...props
   }) => {
    const {t} = useTranslation();

    const onPopupScroll = (event) => {
      const target = event.target;
      if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
        onScroll && onScroll(event);
        target.scrollTo(0, target.scrollHeight);
      }
    }

    return (
      <div className={`form-select-wrapper ${customStyleWrapper}`}>
        {label && <div className={`label ${customStyleLabel}`}>{label}</div>}

        <Select id={id}
          className={`select ${customStyleSelect} ${touched && errors ? 'error' : ''}`}
          dropdownStyle={customDropdownStyle}
          placeholder={placeholder}
          suffixIcon={icon}
          loading={loading}
          mode={mode}
          size={size}
          value={value}
          disabled={disabled}
          allowClear={!loading && isClearable}
          filterOption={filterOption}
          filterSort={filterSort}
          showSearch={onSearch}
          onSearch={onSearch}
          onPopupScroll={onPopupScroll}
          onChange={data => onChange(data || '')}
          {...props}>

          {items.map(item => (
            <Option className={customStyleOptions}
              key={'key-' + item[optionValue]}
              value={item[optionValue]}
              disabled={disabledOptions.includes(item[optionValue])}>
              {t(`${item[optionTitle]}`)}
            </Option>
          ))}

        </Select>

        {touched && errors && <p>{errors}</p>}
      </div>
    )
  }

