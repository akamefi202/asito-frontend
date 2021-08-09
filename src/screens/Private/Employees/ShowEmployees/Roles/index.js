import React, {useState} from "react";
import {Link} from "react-router-dom";
import {PATHS} from "utils/constants";
import {Card, Button} from "shared/components";
import {FaHourglassEnd} from "react-icons/fa";
import ProtocolsModal from "./protocolsModal";
import {USER_ROLES} from "shared/constants/userRoles";
import {useReactiveVar} from "@apollo/client";
import {UserStore} from "shared/store/UserStore";
import {TableFormControl} from "../../../../../shared/components/TableFormControl/TableFormControl";

const columns = (t, protocolsVisible, isAccess) => [
  {
    title: t('SHOW.ROLES.COLUMNS.NAME'),
    dataIndex: ['role', 'name'],
    render: (name, record) => (
      <Link className="custom-link items-center" to={PATHS.ROLES.SHOW.replace(':id', record.role?.id)}>
        {name}
      </Link>),
  },
  {
    title: t('SHOW.ROLES.COLUMNS.PROTOCOLS'),
    dataIndex: ['role', 'protocols'],
    render: (protocols, record) => {
      if (record.role?.accepted) {
        return (
          <div className="access--type items-center">
            <span className="icon icon-Check green"/>
            <span>Geaccepteerd</span>
          </div>
        )
      }
      if (isAccess()) {
        return (
          <div className="access--type items-center">
            <FaHourglassEnd className="icon yellow"/>
            {t('SHOW.ROLES.PENDING')}
          </div>
        )
      } else {
        return (<Button buttonStyle={"btn--primary"}
          icon={<span className="btn--icon--right icon-Eye-Show"/>}
          onClick={() => protocolsVisible(protocols, record.role)}>
          {t('SHOW.ROLES.VIEW_PROTOCOLS')}
        </Button>)
      }
    }
  },
];

export default ({t, roles, loading}) => {
  const user = useReactiveVar(UserStore);
  const userRole = user && user.issuer && user.issuer.kind ? user.issuer.kind : null;

  const [page, setPage] = useState(1);
  const [protocolsModalVisible, setProtocolsModalVisible] = useState({visible: false, activeRole: null});

  const onPageChange = (page) => setPage(page);

  const protocolsVisible = (protocols, role) => setProtocolsModalVisible({visible: true, activeRole: role});

  const isAccess = () => userRole && (userRole === USER_ROLES.CLIENT.key);

  return (
    <Card cardStyle='card--details'>
      <h2 className="card--details--title">{t('SHOW.MENU.ROLES')}</h2>

      <TableFormControl rowKey='id'
        columns={columns(t, protocolsVisible, isAccess)}
        dataSource={roles}
        loading={loading}
        page={page}
        total={roles.length}
        onPageChange={onPageChange}
        pagination={false}/>

      {protocolsModalVisible &&
      <ProtocolsModal t={t}
        visible={protocolsModalVisible.visible}
        handleCancel={setProtocolsModalVisible}
        role={protocolsModalVisible.activeRole}/>}
    </Card>
  );
};
