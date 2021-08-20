import React from "react";
import { Row, Col } from "antd";
import Card from "shared/components/Card";
import { Field } from "shared/components/Field/Field";

export default ({t, role}) => (
   <Card cardStyle="card--details">
     <h2 className="card--details--title">{t('SHOW.MENU.GENERAL_INFORMATION')}</h2>

     <Row>
       <Field id='status'
          customStyleField={`card--details--item--value ${role.status === 'ACTIVE' ? 'green' : 'yellow'}`}
          label={t('SHOW.GENERAL_INFORMATION.STATUS')}
          value={role.status && t(`STATUS_CODE.${role.status}`)}/>
     </Row>

     <Row>
       <Col xs={24} sm={24} md={12} lg={12}>
         <Field id='name'
            label={t('SHOW.GENERAL_INFORMATION.ROLE_NAME')}
            value={role.name}/>
       </Col>

       <Col xs={24} sm={24} md={12} lg={12}>
         <Field id='numberOfEmployeesRequired'
            label={t('SHOW.GENERAL_INFORMATION.EMPLOYEE_REQUIRED')}
            value={role.numberOfEmployeesRequired}/>
       </Col>
     </Row>

     <Row>
       <Col xs={24} sm={24} md={24} lg={24}>
         <Field id='roleDescription'
            label={t('SHOW.GENERAL_INFORMATION.ROLE_DESCRIPTION')}
            value={role.roleDescription}/>
       </Col>
     </Row>
   </Card>
);
