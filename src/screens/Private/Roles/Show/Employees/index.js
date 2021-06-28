import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "utils/constants";
import { Row, Col, Popconfirm } from "antd";
import { Card, Table, Button, Select, Spin } from "shared/components";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";
import { EmployeeQueries, EmployeeRoleQueries } from "shared/graphql/queries";
import { EmployeeRoleMutations } from "shared/graphql/mutations";
import cuid from "cuid";
import { USER_ROLES } from "shared/constants/userRoles";
import { useReactiveVar } from "@apollo/client";
import { UserStore } from "shared/store/UserStore";
import { delay } from "utils/helpers/delay";
import { messages } from "utils/helpers/message";
import { datesEqual } from "utils/helpers/moment";
import { withoutRepetitions } from "utils/helpers/array";

const { EMPLOYEES } = EmployeeQueries;
const { EMPLOYEE_ROLES } = EmployeeRoleQueries;
const { UPDATE_CREATE_EMPLOYEE_ROLE, REMOVE_EMPLOYEE_ROLE } = EmployeeRoleMutations;

const columns = (t, removeOperator, checkRequirements) => [
  {
    title: t("SHOW.EMPLOYEES.COLUMNS.EMPLOYEE"),
    dataIndex: "employee",
    key: "employee",
    visible: [
      USER_ROLES.PLANER.key,
      USER_ROLES.CLIENT.key,
      USER_ROLES.TEST.key
    ],
    sorter: (a, b) => a.employee.firstName.localeCompare(b.employee.firstName),
    render: (_, record) => (
      <Link 
        className="custom-link" 
        to={PATHS.EMPLOYEES.SHOW.replace(":id", record.employee.id)}>
          {`${record.employee.firstName} ${record.employee.lastName}`}
      </Link>
    ),
  },
  {
    title: t("SHOW.EMPLOYEES.COLUMNS.NUMBER"),
    dataIndex: ["employee", "number"],
    key: "number",
    visible: [
      USER_ROLES.PLANER.key,
      USER_ROLES.CLIENT.key,
      USER_ROLES.TEST.key
    ],
  },
  {
    title: t("SHOW.EMPLOYEES.COLUMNS.CERTIFICATES"),
    dataIndex: ["employee", "certificates"],
    key: "certificates",
    visible: [
      USER_ROLES.PLANER.key,
      USER_ROLES.CLIENT.key,
      USER_ROLES.TEST.key
    ],
    render: (certificates) => {
      const requirement = checkRequirements(certificates);
      return (
        <div className="access--type">
          {requirement ? <span className="icon icon-Check green" /> : <span className="icon icon-Close red"/>}
          <span>{certificates && certificates.length}=</span>
        </div>
      )
    },
  },
  {
    title: "",
    dataIndex: "DELL",
    key: "DELL",
    visible: [
      USER_ROLES.PLANER.key,
      USER_ROLES.TEST.key
    ],
    render: (_, record) => (
      <div className="btn--icon">
        <Popconfirm title={t("SHOW.EMPLOYEES.SURE_DELETE")} onConfirm={() => removeOperator(record.id)}>
          <CloseOutlined />
        </Popconfirm>
      </div>
    ),
  }
];

export default ({ t, role, roleId }) => {
  const user = useReactiveVar(UserStore);
  const userRole = user && user.issuer && user.issuer.kind ? user.issuer.kind : null;
  const [employeeRoles, setEmployeeRoles] = useState([]);
  const [totalEmployeeRoles, setTotalEmployeeRoles] = useState(0);
  const [addForm, setAddForm] = useState(false);
  const [page, setPage] = useState(1);
  const [skipEmployeeRoles, setSkipEmployeeRoles] = useState(0);
  const [takeEmployeeRoles, setTakeEmployeeRoles] = useState(10);
  const [loading, setLoading] = useState(false);
  const [employeesSelect, setEmployeesSelect] = useState([]);
  const [scanSelect, setScanSelect] = useState("");
  const [pageSelect, setPageSelect] = useState(1);
  const [skipSelect, setSkipSelect] = useState(0);
  const [totalSelect, setTotalSelect] = useState(0);
  const [takeSelect, setTakeSelect] = useState(50);
  const [scanStatus, setScanStatus] = useState(false);

  const variablesEmployeeRoles = { where: { role: { id: roleId } }, skip: skipEmployeeRoles, take: takeEmployeeRoles };
  const variablesSelect = { scan: scanSelect, skip: skipSelect, take: takeSelect };

  useEffect(() => {
    setLoading(true);
    getEmployeeRoles();
  }, []);

  const { loading: loadingOperators } = useQuery(EMPLOYEES, {
    variables: variablesSelect,
    onCompleted: ({ employees }) => {
      if (!employees || !employees.data) return;
      const select = employees.data.map((item) => ({ 
        key: item.id, 
        value: `${item.firstName} ${item.lastName}` 
      }));
      setTotalSelect(employees.count || 0);
      const selectAll = scanStatus ? select : withoutRepetitions([...employeesSelect, ...select]);
      setScanStatus(false);
      setEmployeesSelect(selectAll);
    },
    onError: (error) => {
      messages({ data: error });
    }
  });

  const getSelect = () => {
    if ((totalSelect <= skipSelect) || (takeSelect >= totalSelect)) return;
    const page = pageSelect;
    setPageSelect(page + 1);
    setSkipSelect(takeSelect * page);
  }

  const getScanSelect = (value) => {
    delay(() => {
      setPageSelect(1);
      setSkipSelect(0);
      setScanSelect(value);
      setScanStatus(true);
    }, 500);
  }

  const [getEmployeeRoles] = useLazyQuery(EMPLOYEE_ROLES, {
    variables: variablesEmployeeRoles,
    onCompleted: ({ employeeRoles }) => {
      setLoading(false);
      if (!employeeRoles || !employeeRoles.data) return;
      setTotalEmployeeRoles(employeeRoles.count);
      setEmployeeRoles(employeeRoles.data);
    },
    onError: (error) => {
      setLoading(false);
      messages({ data: error });
    }
  });

  const [createEmployeeRole] = useMutation(UPDATE_CREATE_EMPLOYEE_ROLE,
    {
      onCompleted: (data) => {
        getEmployeeRoles();
      },
      onError: (error) => {
        setLoading(false);
        messages({ data: error });
      }
    }
  );

  const [removeEmployeeRole] = useMutation(REMOVE_EMPLOYEE_ROLE,
    {
      onCompleted: (data) => {
        getEmployeeRoles();
      },
      onError: (error) => {
        setLoading(false);
        messages({ data: error });
      }
    }
  );

  const onChangeOperator = (id) => {
    setLoading(true);
    const data = {
      id: cuid(),
      role: {
        id: roleId
      },
      employee: {
        id
      }
    }
    createEmployeeRole({ variables: { data } })
  }

  const removeOperator = (id) => {
    setLoading(true);
    removeEmployeeRole({ variables: { data: { id } } })
  }

  const renderBody = (props, columns) => {
    if (!employeeRoles.length) {
      return (
        <tr className={props.className}>
          {props.children}
        </tr>
      );
    }

    return (
      <tr className={props.className}>
        {columns.map((item, idx) => {
          if (userRole && item.visible.includes(userRole)) {
            return props.children[idx]
          }
        })}
      </tr>
    );
  }

  const renderHeader = (props, columns) => {
    if (!employeeRoles.length) {
      return (
        <tr className={props.className}>
          {props.children}
        </tr>
      );
    }

    return (
      <tr className={props.className}>
        {columns.map((item, idx) => {
          if (userRole && item.visible.includes(userRole)) {
            return props.children[idx];
          }
        })}
      </tr>
    );
  }

  const onPageChange = (page) => {
    setPage(page);
    setSkipEmployeeRoles(takeEmployeeRoles * (page - 1));
  };

  const onShowSizeChange = (current, size) => {
    setTakeEmployeeRoles(size);
  }

  const checkRequirements = (certificates) => {
    let requirement = false;
    if (role && role.requirements && role.requirements.length) {
      requirement = role.requirements.some(item => {
        return !!certificates.find(certificat => certificat.requirement 
          && certificat.requirement.type === item.type 
          && datesEqual(certificat.validUntil, item.validAtLeastUntil));
      });
    } else {
      requirement = certificates && certificates.length ? true : false;
    }

    return requirement;
  }

  const isAccess = () => userRole && ((userRole === USER_ROLES.PLANER.key) || (userRole === USER_ROLES.TEST.key));

  return (
    <Card cardStyle={"card--details"}>
      <Spin spinning={loading}>
        <Row>
          <Col xs={24}>
            <h2 className="card--details--title">
              {t("SHOW.MENU.EMPLOYEES")}
            </h2>
          </Col>
        </Row>
        <Row className="w-100-100">
          <Col xs={24} sm={24}>
            {isAccess() &&
              (<>
                <Button
                  onClick={() => setAddForm(true)}
                  icon={<PlusOutlined className="btn--icon--right" />}
                  buttonStyle={"btn--outline"}
                >
                  {t("SHOW.EMPLOYEES.ADD_ROW")}
                </Button>
                {addForm &&
                  <div className="form--add--operators">
                    <Select
                      placeholder={t("SHOW.EMPLOYEES.SEARCH_OPERATOR")}
                      onChange={onChangeOperator}
                      items={employeesSelect}
                      getSelect={getSelect}
                      getScan={getScanSelect}
                      loading={loadingOperators}
                    />
                    <div className="btn--icon">
                      <CloseOutlined onClick={() => setAddForm(false)} />
                    </div>
                  </div>
                }
              </>)
            }
            <Table
              columns={columns(t, removeOperator, checkRequirements)}
              className="custom--table"
              data={employeeRoles}
              rowKey={"id"}
              total={totalEmployeeRoles}
              page={page}
              pageSize={takeEmployeeRoles}
              onPageChange={onPageChange}
              onShowSizeChange={onShowSizeChange}
              components={{
                header: {
                  row: (props) => renderHeader(props, columns(t, removeOperator))
                },
                body: {
                  row: (props) => renderBody(props, columns(t, removeOperator))
                },
              }}
              onRow={(record) => {
                return {
                  onClick: () => { },
                };
              }}
            />
          </Col>
        </Row>
      </Spin>
    </Card>
  );
};