import React from 'react';
import {Select} from 'antd';
import {useTranslation} from "react-i18next";
import {delay} from "../../../utils/helpers/delay";
import './style.scss';

import {NAME_SPACES} from "../../locales/constants";

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
     filterOption = false,
     filterSort,
     onChange,
     onSearch,
     searchDelay = 500,
     onScroll,
     ...props
   }) => {
    const {t} = useTranslation(NAME_SPACES.COUNTRIES);

    const onPopupScroll = (event) => {
      const target = event.target;
      if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
        onScroll && onScroll(event);
        target.scrollTo(0, target.scrollHeight);
      }
    }

    const onSelectSearch = (value) => delay(() => onSearch(value), searchDelay);

    const sortItems = (a, b) => {
      const nameA = t(`${a?.[optionTitle] || a}`).toLowerCase(), nameB = t(`${b?.[optionTitle] || b}`).toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
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
          onSearch={onSelectSearch}
          onPopupScroll={onPopupScroll}
          onChange={data => onChange(data || '')}
          {...props}>

          {items.sort(sortItems).map(item => (
            <Option className={customStyleOptions}
              key={'key-' + item[optionValue]}
              value={item?.[optionValue] || item}
              disabled={disabledOptions.includes(item[optionValue])}>
              {t(`${item?.[optionTitle] || item}`)}
            </Option>
          ))}

        </Select>

        {touched && errors && <p>{errors}</p>}
      </div>
    )
  }

