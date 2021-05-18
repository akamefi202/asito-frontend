import React from "react";
import { Select } from "antd";
import { Spin } from "shared/components";
import "./style.scss"

const { Option } = Select;

export default ({
  items = [],
  icon,
  placeholder,
  errors,
  value,
  touched,
  loading,
  custom = '',
  getSelect,
  getScan,
  onChange = () => { },
  ...rest
}) => {
  const onPopupScroll = (event) => {
    if (!getSelect && typeof getSelect !== 'function') return;
    const target = event.target;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      getSelect();
      target.scrollTo(0, target.scrollHeight);
    }
  }

  const onSearch = (value) => {
    if (!getScan && typeof getScan !== 'function') return;
    getScan(value);
  }

  const onSelect = (op) => {
    if (!getScan && typeof getScan !== 'function') return;
    getScan("");
  }


  return (
    <Spin spinning={loading}>
      <div className={`select-wrapper ${custom}`}>
        <Select
          className={`custom--select ${touched && errors ? 'error' : ''}`}
          showSearch
          size="large"
          value={value !== "" ? value : null}
          placeholder={placeholder}
          optionFilterProp="children"
          filterOption={(input, option) => {
            if (getScan && typeof getScan === 'function') return option;
            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }}
          onPopupScroll={onPopupScroll}
          onSearch={onSearch}
          onSelect={onSelect}
          onChange={value => {
            onChange(value);
          }}
          {...rest}
        >
          {items.map((item) => (
            <Option key={item.key} value={item.key}>{item.value}</Option>
          ))}
        </Select>
        {touched && <p>{errors}</p>}
      </div>
    </Spin>
  );
};
