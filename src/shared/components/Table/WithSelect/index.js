import React from "react";
import PropTypes from "prop-types";
import { Checkbox, Row, Button } from "antd";

const WithSelect = WrappedComponent => props => (
  <Row className="w-100-100" >
    {props.withSelect && (
      <Row type="flex" justify="space-between">
        <Checkbox
          onChange={props.onSelecAllChange}
          className="select_all_checkbox"
        >
          {props.t("selectAll")}
        </Checkbox>
        {props.selectedRowKeys.length > 0 && (
          <Button onClick={props.onAction.action}>{props.onAction.name}</Button>
        )}
      </Row>
    )}
    <WrappedComponent {...props} />
  </Row>
);

WithSelect.propTypes = {
  onAction: PropTypes.shape({
    name: PropTypes.string,
    action: PropTypes.func
  }),
  withSelect: PropTypes.bool,
  t: PropTypes.func.isRequired,
  onActionClick: PropTypes.func,
  selectedRowKeys: PropTypes.array,
  onSelecAllChange: PropTypes.func
};

WithSelect.defaultProps = {
  onAction: {
    name: null,
    action: () => {}
  },
  withSelect: false,
  selectedRowKeys: [],
  onActionClick: () => {},
  onSelecAllChange: () => {}
};

export default WithSelect;
