import React from "react";
import {Row, Col} from "antd";
import Card from "shared/components/Card";
import {dateToString} from "utils/helpers/moment";
import {Field} from "../../../../../shared/components/Field/Field";

export default ({t, employee}) => (
  <Card cardStyle={"card--details"}>
    <h2 className="card--details--title">{t('SHOW.MENU.GENERAL_INFORMATION')}</h2>

    <Row gutter={[16, 8]}>
      <Col xs={24} sm={24} md={24} lg={24}>
        <Field id='number'
          label={t('SHOW.GENERAL_INFORMATION.NUMBER')}
          value={employee.number}/>
      </Col>
    </Row>

    <Row gutter={[16, 8]}>
      <Col xs={24} sm={24} md={9} lg={9}>
        <Field id='firstName'
          label={t('SHOW.GENERAL_INFORMATION.FIRST_NAME')}
          value={employee.firstName}/>
      </Col>

      <Col xs={24} sm={24} md={6} lg={6}>
        <Field id='middleName'
          label={t('SHOW.GENERAL_INFORMATION.MIDDLE_NAME')}
          value={employee.middleName}/>
      </Col>

      <Col xs={24} sm={24} md={9} lg={9}>
        <Field id='lastName'
          label={t('SHOW.GENERAL_INFORMATION.LAST_NAME')}
          value={employee.lastName}/>
      </Col>
    </Row>

    <Row gutter={[16, 8]}>
      <Col xs={24} sm={24} md={12} lg={12}>
        <Field id='dateOfBirth'
          label={t('SHOW.GENERAL_INFORMATION.DATE_OF_BIRTH')}
          value={dateToString(employee.dateOfBirth)}/>
      </Col>

      <Col xs={24} sm={24} md={12} lg={12}>
        <Field id='gender'
          label={t('SHOW.GENERAL_INFORMATION.DATE_OF_BIRTH')}
          value={t(`GENDER.${employee.gender}`)}/>
      </Col>
    </Row>

    {employee.avatar &&
    <Row gutter={[16, 8]}>
      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="card--details--item">
          <h5 className="card--details--item--key">{t('SHOW.GENERAL_INFORMATION.PHOTO')}</h5>
          <div className='card--details--photo--wrapper'>
            <img src={employee.avatar} alt='avatar'/>
          </div>
        </div>
      </Col>
    </Row>}
  </Card>
);
