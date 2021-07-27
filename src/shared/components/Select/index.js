import React from "react";
import { Select } from "antd";
import { Spin } from "shared/components";
import "./style.scss"
import {useTranslation} from "react-i18next";
import {NAME_SPACES} from "../../locales/constants";

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
  const { t } = useTranslation(NAME_SPACES.COUNTRIES);

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

  const sortItems = (a, b) => {
    const nameA = t(`${a.value}`).toLowerCase(), nameB = t(`${b.value}`).toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  }

  return (
    <Spin spinning={loading}>
      <div className={`select-wrapper ${custom}`}>
        <Select
          className={`custom--select ${touched && errors ? 'error' : ''}`}
          showSearch
          size="large"
          value={value !== "" ? value : null}
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
          {items.sort(sortItems).map((item) => (
            <Option key={item.key} value={item.key}>{t(`${item.value}`)}</Option>
          ))}
        </Select>
        {touched && <p>{errors}</p>}
      </div>
    </Spin>
  );
};
