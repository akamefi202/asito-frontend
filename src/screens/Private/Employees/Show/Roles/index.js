import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "utils/constants";
import { Row, Col } from "antd";
import { Card, Table, Button } from "shared/components";
import { FaHourglassEnd } from "react-icons/fa";
import ProtocolsModal from "./protocolsModal";
import { USER_ROLES } from "shared/constants/userRoles";
import { useReactiveVar } from "@apollo/client";
import { UserStore } from "shared/store/UserStore";

const columns = (t, protocolsVisible, isAccess) => [
  {
    title: t("SHOW.ROLES.COLUMNS.NAME"),
    dataIndex: ["role", "name"],
    key: "name",
    sorter: (a, b) => a.role.name.localeCompare(b.role.name),
    render: (name, record) => (
      <Link
        className="custom-link items-center"
        to={PATHS.ROLES.SHOW.replace(":id", record.role.id)}>
          {name}
      </Link>
    ),
  },
  {
    title: t("SHOW.ROLES.COLUMNS.PROTOCOLS"),
    dataIndex: ["role", "protocols"],
    key: "protocols",
    render: (protocols, record) => {
      if (record.role.accepted) {
        return (
          <div className="access--type items-center">
            <span className="icon icon-Check green" />
            <span>Geaccepteerd</span>
          </div>
        )
      }
      if (isAccess()) {
        return (
          <div className="access--type items-center">
            <FaHourglassEnd className="icon yellow" />
            {t('SHOW.ROLES.PENDING')}
          </div>
        )
      } else {
        return (<Button
          onClick={() => protocolsVisible(protocols, record.role)}
          icon={<span className="btn--icon--right icon-Eye-Show" />}
          buttonStyle={"btn--primary"}
        >{t('SHOW.ROLES.VIEW_PROTOCOLS')}</Button>)
      }
    }
  },
];

export default ({ t, roles }) => {
  const user = useReactiveVar(UserStore);
  const userRole = user && user.issuer && user.issuer.kind ? user.issuer.kind : null;

  const [page, setPage] = useState(1);
  const [protocolsModalVisible, setProtocolsModalVisible] = useState({visible: false, activeRole: null});

  const onPageChange = (page) => {
    setPage(page);
  };

  const protocolsVisible = (protocols, role) => {
    setProtocolsModalVisible({visible: true, activeRole: role});
  }

  const isAccess = () => userRole && (userRole === USER_ROLES.CLIENT.key);

  return (
    <Card cardStyle={"card--details"}>
      <Row>
        <Col xs={24}>
          <h2 className="card--details--title">
            {t("SHOW.MENU.ROLES")}
          </h2>
        </Col>
      </Row>
      <Row className="w-100-100">
        <Col xs={24} sm={24}>
          <Table
            columns={columns(t, protocolsVisible, isAccess)}
            className="custom--table"
            data={roles}
            page={page}
            total={roles.length}
            onPageChange={onPageChange}
            rowKey={"id"}
            onRow={(record) => {
              return {
                onClick: () => { },
              };
            }}
          />
        </Col>
      </Row>
      {protocolsModalVisible
        ?
          <ProtocolsModal
            t={t}
            visible={protocolsModalVisible.visible}
            handleCancel={setProtocolsModalVisible}
            role={protocolsModalVisible.activeRole} />
        : ''}
    </Card>
  );
};
