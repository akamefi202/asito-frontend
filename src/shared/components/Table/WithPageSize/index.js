import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Select } from "antd";
const { Option } = Select;

const selectData = [5, 10, 15, 20, 25, 50, 100];

const WithPageSize = WrappedComponent => props => (
  <Row>
    {props.withPageSize && (
      <Row
        type="flex"
        justify="end"
        style={{
          paddingBottom: 10
        }}
      >
        <Col span={4}>
          {props.t("itemsPerPage")}
          <Select
            style={{
              width: "100%"
            }}
            onChange={props.onPageSizeChange}
            defaultValue={10}
          >
            {selectData.map(value => (
              <Option key={value} value={value}>
                {value}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
    )}
    <WrappedComponent {...props} />
  </Row>
);

WithPageSize.propTypes = {
  withPageSize: PropTypes.bool,
  t: PropTypes.func.isRequired
};

WithPageSize.defaultProps = {
  withPageSize: false,
  onPageSizeChange: () => {}
};

export default WithPageSize;
