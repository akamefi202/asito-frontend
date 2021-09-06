import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "utils/constants";
import { Row, Col, Popconfirm } from "antd";
import { Card, Button } from "shared/components";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { EmployeeQueries, EmployeeRoleQueries } from "shared/graphql/queries";
import { EmployeeRoleMutations } from "shared/graphql/mutations";
import cuid from "cuid";
import { USER_ROLES } from "shared/constants/userRoles";
import { useReactiveVar } from "@apollo/client";
import { UserStore } from "shared/store/UserStore";
import { messages } from "utils/helpers/message";
import { TableFormControl } from "../../../../../shared/components/TableFormControl/TableFormControl";
import { uniq } from "../../../../../utils/helpers/fn";
import { SelectFormControl } from "../../../../../shared/components/SelectFormControl/SelectFormControl";

const {EMPLOYEES} = EmployeeQueries;
const {EMPLOYEE_ROLES} = EmployeeRoleQueries;
const {UPDATE_CREATE_EMPLOYEE_ROLE, REMOVE_EMPLOYEE_ROLE} = EmployeeRoleMutations;

const columns = (t, remove, isAccess) => [
  {
    title: t('SHOW.EMPLOYEES.COLUMNS.EMPLOYEE'),
    dataIndex: 'employee',
    width: '40%',
    sorter: true,
    render: (employee) => (
       <Link className='custom-link'
          to={PATHS.EMPLOYEES.SHOW.replace(':id', employee.id)}>
         {employee.firstName + (employee?.middleName ? ' ' + employee?.middleName : '') + ' ' + employee.lastName}
       </Link>
    ),
  },
  {
    title: t('SHOW.EMPLOYEES.COLUMNS.NUMBER'),
    dataIndex: ['employee', 'number'],
    width: '40%',
  },
  {
    title: t('SHOW.EMPLOYEES.COLUMNS.CERTIFICATES'),
    dataIndex: 'employee',
    width: '10%',
    render: (employee, row) => (
       <div className="access--type">
         {employee?.certificates?.length !== 0 &&
         <span className={'icon ' + (row.hasAccess ? 'icon-Check green' : 'icon-Close red')}/>}
         <span> {employee?.certificates?.length}</span>
       </div>
    )
  },
  isAccess() && {
    title: '',
    dataIndex: 'action',
    width: '10%',
    className: 'cell-action',
    render: (value, row) => (
       <Popconfirm title={t('SHOW.EMPLOYEES.SURE_DELETE')} onConfirm={() => remove(row.id)}>
         <CloseOutlined/>
       </Popconfirm>)
  }
].filter(Boolean);

export default ({t, id}) => {
  const user = useReactiveVar(UserStore);
  const userRole = user && user.issuer && user.issuer.kind ? user.issuer.kind : null;

  const [employeeRoles, setEmployeeRoles] = useState([]);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(5);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState([{name: 'updatedAt', type: 'DESC'}]);

  const [employees, setEmployees] = useState([]);
  const [scanSelect, setScanSelect] = useState('');
  const [skipSelect, setSkipSelect] = useState(0);
  const [takeSelect] = useState(10);
  const [totalSelect, setTotalSelect] = useState(0);
  const [pageSelect, setPageSelect] = useState(1);

  const [value, setValue] = useState(null);

  const [getEmployeeRoles, {loading: lEmployeeRoles}] = useLazyQuery(EMPLOYEE_ROLES, {
    variables: {where: {role: {id}}, skip, take, orderBy: sortType},
    onCompleted: ({employeeRoles}) => {
      setEmployeeRoles(employeeRoles.data);
      setTotal(employeeRoles.count);
    },
    onError: (error) => messages({data: error})
  });

  const [getEmployees, {loading: lEmployees}] = useLazyQuery(EMPLOYEES, {
    variables: { scan: scanSelect, skip: skipSelect, take: takeSelect, orderBy: [{name: 'firstName', type: 'ASC'}] },
    onCompleted: (loadData) => {
      setEmployees(scanSelect
         ? loadData?.employees?.data
         : uniq([...employees, ...(loadData?.employees?.data || [])], 'id'));
      setTotalSelect(loadData?.employees?.count || 0);
    },
    onError: (error) => messages({data: error})
  });

  const load = () => {
    setValue(null);
    if (skip === total - 1 && skip >= take) setSkip(skip - take);
    Promise.all([getEmployeeRoles(), getEmployees()]).then();
  }

  useEffect(() => {
    load();
  }, []);


  const onScroll = () => {
    if ((totalSelect <= skipSelect) || (takeSelect >= totalSelect)) return;
    const page = pageSelect;
    setPageSelect(page + 1);
    setSkipSelect(takeSelect * page);
  }

  const onSearch = (value) => {
    setPageSelect(1);
    setSkipSelect(0);
    setScanSelect(value);
  }

  const [createEmployeeRole] = useMutation(UPDATE_CREATE_EMPLOYEE_ROLE, {
    onCompleted: () => load(),
    onError: (error) => messages({data: error})
  });

  const [removeEmployeeRole] = useMutation(REMOVE_EMPLOYEE_ROLE, {
    onCompleted: () => load(),
    onError: (error) => messages({data: error})
  });

  const create = async () => {
    const data = {
      id: cuid(),
      role: {id},
      employee: {id: value}
    }

    const res = await createEmployeeRole({variables: {data}});

    if (!res.data.createEmployeeRole.id) messages({msg: 'Gebruiker al toegevoegd'})
  }

  const remove = async (id) => {
    await removeEmployeeRole({variables: {data: {id}}})
  }

  const onChangeTable = (pagination, filters, sorter) => {
    if (pagination.current !== page) return;
    onPageChange(1);

    setSortType([sorter.order
       ? {name: 'employee.firstName', type: sorter.order === 'descend' ? 'DESC' : 'ASC'}
       : {name: 'updatedAt', type: 'DESC'}]);
  }

  const onPageChange = (page) => {
    setPage(page);
    setSkip(take * (page - 1));
  };

  const onShowSizeChange = (current, size) => setTake(size);

  const isAccess = () => userRole && ((userRole === USER_ROLES.PLANER.key) || (userRole === USER_ROLES.TEST.key));

  return (
     <Card cardStyle="card--details">
       <h2 className="card--details--title">{t('SHOW.MENU.EMPLOYEES')}</h2>

       {isAccess() && <>
         <Row gutter={[16, 8]} style={{marginBottom: '24px'}}>
           <Col xs={24} sm={24} md={16} lg={16}>
             <SelectFormControl customStyleWrapper='table-select'
                placeholder={t('SHOW.EMPLOYEES.SEARCH_OPERATOR')}
                value={value}
                items={employees.filter(employee => !employeeRoles.some((er, i) => er.employee && employee.id === er.employee.id)).map(e => ({...e, name: e.firstName + ' ' + e.lastName}))}
                loading={lEmployees}
                isClearable={true}
                optionTitle='name'
                onChange={v => setValue(v)}
                onScroll={onScroll}
                onSearch={onSearch}/>
           </Col>

           <Col xs={24} sm={24} md={8} lg={8} style={{margin: 'auto'}}>
             <Button buttonStyle="btn--outline" style={{width: '100%'}} disabled={!value}
                icon={<PlusOutlined className="btn--icon--right"/>}
                onClick={create}>
               {t('SHOW.EMPLOYEES.ADD_ROW')}
             </Button>
           </Col>
         </Row>
       </>}

       <TableFormControl rowKey='id'
          columns={columns(t, remove, isAccess)}
          dataSource={employeeRoles}
          loading={lEmployeeRoles}
          page={page}
          total={total}
          pageSize={take}
          pageSizeOptions={[5, 10, 20]}
          onChange={onChangeTable}
          onShowSizeChange={onShowSizeChange}
          onPageChange={onPageChange}/>
     </Card>
  );
};
