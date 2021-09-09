import React, {useEffect, useState} from "react";
import {Row, Col, Checkbox} from "antd";
import {Card} from "shared/components";
import {useLazyQuery} from "@apollo/react-hooks";
import {EmployeeQueries, CertificateQueries} from "shared/graphql/queries";
import {messages} from "utils/helpers/message";
import {bindInputProps} from "utils/helpers/input";
import moment from 'moment';
import {REQUIRED_FIELD_SYMBOL} from "utils/constants";
import {SelectFormControl} from "../../../../../shared/components/SelectFormControl/SelectFormControl";
import {InputFormControl} from "../../../../../shared/components/InputformControl/InputFormControl";
import {DatePickerFormControl} from "../../../../../shared/components/DatePickerFormControl/DatePickerFormControl";
import {uniq} from "../../../../../utils/helpers/fn";

const { EMPLOYEES } = EmployeeQueries;
const { CERTIFICATE_TYPES } = CertificateQueries;

export default ({t, formik, certificateTypes}) => {
  const limit = 10;

  const [employeesItems, setEmployeesItems] = useState([]);
  const [requirementsItems, setRequirementsItems] = useState([]);
  const [searchEmployees, setSearchEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [searchRequirementValue, setSearchRequirementValue] = useState('');
  const [searchRequirements,  setSearchRequirements] = useState([]);
  const [totalSelectRequirements, setTotalSelectRequirements] = useState(0);
  const [skip, setSkip] = useState(0);
  const [skipRequirements, setSkipRequirements] = useState(0);
  const [pageSelect, setPageSelect] = useState(1);
  const [requirementPageSelect, setRequirementPageSelect] = useState(1);
  const [totalSelect, setTotalSelect] = useState(0);

  useEffect(() => {
    getEmployees();
    getRequirements();
  }, [])

  const [getEmployees, {loading}] = useLazyQuery(EMPLOYEES, {
    variables: {scan: search, skip: skip, take: limit, orderBy:[{name: 'firstName', type: 'ASC'}]},
    onCompleted: ({employees}) => {
      const items = employees?.data?.map(item => ({
        id: item.id,
        value: item?.firstName + ' ' + (item?.middleName || '') + ' ' + item?.lastName
      }));
      setTotalSelect(employees.count || 0);
      if (search) setSearchEmployees(items)
      else {
        setEmployeesItems(uniq([...employeesItems, ...items], 'id'));
        setSearchEmployees([])
      }
    },
    onError: (error) => messages({data: error})
  });

  const [getRequirements, { loading: loadingRequirements }] = useLazyQuery(CERTIFICATE_TYPES, {
    variables: {scan: searchRequirementValue, skip: skipRequirements, take: limit, orderBy: [{name: 'type', type: 'ASC'}]},
    onCompleted: ({requirements}) => {
      const items = requirements?.data?.map(item => ({
        id: item.id,
        type: item?.type,
        validUntil: item.validAtLeastUntil
      }));
      setTotalSelectRequirements(requirements.count || 0);
      if (searchRequirementValue) setSearchRequirements(items)
      else {
        setRequirementsItems(uniq([...requirementsItems, ...items], 'id'));
        setSearchRequirements([])
      }
    },
    onError: (error) => messages({data: error})
  });

  const onScroll = () => {
    if ((totalSelect <= skip) || (limit >= totalSelect)) return;
    const page = pageSelect;
    setPageSelect(page + 1);
    setSkip(limit * page);
  }

  const onSearch = (value) => {
    setPageSelect(1);
    setSkip(0);
    setSearch(value);
  }

  const onSearchRequirement = (value) => {
    setSkipRequirements(0);
    setSearchRequirementValue(value);
  }

  const onScrollRequirement = () => {
    if ((totalSelectRequirements <= skipRequirements) || (limit >= totalSelectRequirements)) return;
    const page = requirementPageSelect;
    setRequirementPageSelect(page + 1);
    setSkipRequirements(limit * page);
  }

  const onClear = () => setSearch('');

  if (!formik.values.infinite) delete formik.values.validUntil;

  if (new Date(formik.values.issuedOn) > new Date(formik.values.validUntil)) {
    formik.values.validUntil = undefined;
  }

  const disabledDate = (current) => {
    const issuedOn = new Date(formik.values.issuedOn);

    return current &&
      (current < moment().subtract(0, 'day').endOf('day') || current < new Date(issuedOn.getFullYear(), issuedOn.getMonth(), issuedOn.getDate() + 1));
  };

  return (
    <Card cardStyle={"card--form"}>
      <h2 className="card--form--title">{t("FORM.MENU.GENERAL_INFORMATION")}</h2>

      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <SelectFormControl id="employee"
            label={(t('FORM.GENERAL_INFORMATION.ISSUED_TO') + ' ' + REQUIRED_FIELD_SYMBOL)}
            placeholder={t('FORM.GENERAL_INFORMATION.ISSUED_TO_PLACEHOLDER')}
            {...bindInputProps({name: 'employee.id', ...formik})}
            items={search ? searchEmployees : employeesItems}
            loading={loading}
            filterOption={false}
            isClearable={true}
            defaultActiveFirstOption={false}
            notFoundContent={null}
            onScroll={onScroll}
            onClear={onClear}
            onSearch={onSearch}/>
        </Col>
      </Row>

      <Row gutter={[10, 8]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <InputFormControl id="number"
            label={t('FORM.GENERAL_INFORMATION.CERTIFICATE_NUMBER') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.GENERAL_INFORMATION.CERTIFICATE_NUMBER_PLACEHOLDER')}
            {...bindInputProps({name: 'number', ...formik})}/>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <SelectFormControl id="type"
            label={(t('FORM.GENERAL_INFORMATION.CERTIFICATE_TYPE') + ' ' + REQUIRED_FIELD_SYMBOL)}
            placeholder={t('FORM.GENERAL_INFORMATION.CERTIFICATE_TYPE_PLACEHOLDER')}
            {...bindInputProps({name: 'requirement.id', ...formik})}
            items={searchRequirementValue ? searchRequirements : requirementsItems}
            loading={loadingRequirements}
            optionValue='id'
            optionTitle='type'
            onScroll={onScrollRequirement}
            onSearch={onSearchRequirement}/>
        </Col>
      </Row>

      <Row gutter={[10, 8]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <DatePickerFormControl id="issuedOn"
            label={t('FORM.GENERAL_INFORMATION.ISSUED_ON') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.GENERAL_INFORMATION.ISSUED_ON_PLACEHOLDER')}
            {...bindInputProps({name: 'issuedOn', ...formik})}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item-checkbox">
            <Checkbox {...bindInputProps({name: 'infinite', ...formik})}>
              {t('FORM.GENERAL_INFORMATION.EXPIRATION_DATE')}
            </Checkbox>
          </div>
        </Col>
      </Row>

      <Row gutter={[10, 8]}>
        {formik.values?.infinite && <Col xs={24} sm={24} md={12} lg={12}>
          <DatePickerFormControl id="validUntil"
            label={t('FORM.GENERAL_INFORMATION.VALID_UNTIL') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.GENERAL_INFORMATION.VALID_UNTIL_PLACEHOLDER')}
            {...bindInputProps({name: 'validUntil', ...formik})}
            disabledDate={disabledDate}
          />
        </Col>}
      </Row>
    </Card>
  );
};
