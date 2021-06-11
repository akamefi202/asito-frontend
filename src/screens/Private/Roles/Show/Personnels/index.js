import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "utils/constants";
import { Row, Col, Popconfirm } from "antd";
import { Card, Table, Button, Select, Spin } from "shared/components";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { BsCheck } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";
import { EmployeeQueries, OperatorSiteQueries } from "shared/graphql/queries";
import { OperatorSiteMutations } from "shared/graphql/mutations";
import cuid from "cuid";
import { USER_ROLES } from "shared/constants/userRoles";
import { useReactiveVar } from "@apollo/client";
import { UserStore } from "shared/store/UserStore";
import { delay } from "utils/helpers/delay";
import { messages } from "utils/helpers/message";
import { datesEqual } from "utils/helpers/moment";
import { withoutRepetitions } from "utils/helpers/array";
import { EMPLOYEE } from "shared/graphql/queries/employee";

const { EMPLOYEES } = EmployeeQueries;
const { OPERATOR_SITES } = OperatorSiteQueries;
const { UPDATE_CREATE_OPERATOR_SITE, REMOVE_OPERATOR_SITE } = OperatorSiteMutations;

const columns = (t, removeOperator, checkRequirements) => [
  {
    title: t("SHOW.PERSONNEL.COLUMNS.PERSONNEL"),
    dataIndex: "personnel",
    key: "personnel",
    visible: [
      USER_ROLES.PLANER.key,
      USER_ROLES.CLIENT.key,
      USER_ROLES.TEST.key
    ],
    sorter: (a, b) => a.employee.firstName.localeCompare(b.employee.firstName),
    render: (_, record) => (
      <Link 
        className="custom-link" 
        to={PATHS.EMPLOYEES.SHOW.replace(":id", record.id)}>
          {`${record.employee.firstName} ${record.employee.lastName}`}
      </Link>
    ),
  },
  {
    title: t("SHOW.PERSONNEL.COLUMNS.EMPLOYEE_NUMBER"),
    dataIndex: ["employee", "number"],
    key: "number",
    visible: [
      USER_ROLES.PLANER.key,
      USER_ROLES.CLIENT.key,
      USER_ROLES.TEST.key
    ],
  },
  {
    title: t("SHOW.PERSONNEL.COLUMNS.CERTIFICATES"),
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
          {requirement ? <BsCheck className="icon green" /> : <IoClose className="icon red"/>}
          <span>{certificates && certificates.length}</span>
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
        <Popconfirm title={t("SHOW.PERSONNEL.SURE_DELETE")} onConfirm={() => removeOperator(record.id)}>
          <CloseOutlined />
        </Popconfirm>
      </div>
    ),
  }
];

export default ({ t, role, roleId, total, setTotal }) => {
  const user = useReactiveVar(UserStore);
  const userRole = user && user.issuer && user.issuer.kind ? user.issuer.kind : null;
  const [siteOperators, setSiteOperators] = useState([]);
  const [addForm, setAddForm] = useState(false);
  const [page, setPage] = useState(1);
  const [skipOperatorSites, setSkipOperatorSites] = useState(0);
  const [takeOperatorSites, setTakeOperatorSites] = useState(10);
  const [loading, setLoading] = useState(false);
  const [employeesSelect, setEmployeesSelect] = useState([]);
  const [scanSelect, setScanSelect] = useState("");
  const [pageSelect, setPageSelect] = useState(1);
  const [skipSelect, setSkipSelect] = useState(0);
  const [totalSelect, setTotalSelect] = useState(0);
  const [takeSelect, setTakeSelect] = useState(50);
  const [scanStatus, setScanStatus] = useState(false);

  const variablesOperatorSites = { where: { site: { id: roleId } }, skip: skipOperatorSites, take: takeOperatorSites };
  const variablesSelect = { scan: scanSelect, skip: skipSelect, take: takeSelect };

  useEffect(() => {
    setLoading(true);
    getOperatorSite();
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

  const [getOperatorSite] = useLazyQuery(OPERATOR_SITES, {
    variables: variablesOperatorSites,
    onCompleted: ({ employeeSites }) => {
      setLoading(false);
      if (!employeeSites || !employeeSites.data) return;
      setTotal(employeeSites.count);
      setSiteOperators(employeeSites.data);
    },
    onError: (error) => {
      setLoading(false);
      messages({ data: error });
    }
  });

  const [createOperatorSite] = useMutation(UPDATE_CREATE_OPERATOR_SITE,
    {
      onCompleted: (data) => {
        getOperatorSite();
      },
      onError: (error) => {
        setLoading(false);
        messages({ data: error });
      }
    }
  );

  const [removeOperatorSite] = useMutation(REMOVE_OPERATOR_SITE,
    {
      onCompleted: (data) => {
        getOperatorSite();
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
      site: {
        id: roleId
      },
      employee: {
        id
      }
    }
    createOperatorSite({ variables: { data } })
  }

  const removeOperator = (id) => {
    setLoading(true);
    removeOperatorSite({ variables: { data: { id } } })
  }

  const renderBody = (props, columns) => {
    if (!siteOperators.length) {
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
    if (!siteOperators.length) {
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
    setSkipOperatorSites(takeOperatorSites * (page - 1));
  };

  const onShowSizeChange = (current, size) => {
    setTakeOperatorSites(size);
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
              {t("SHOW.MENU.PERSONNEL")}
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
                  {t("SHOW.PERSONNEL.ADD_ROW")}
                </Button>
                {addForm &&
                  <div className="form--add--operators">
                    <Select
                      placeholder={t("SHOW.PERSONNEL.SEARCH_OPERATOR")}
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
              data={siteOperators}
              rowKey={"id"}
              total={total}
              page={page}
              pageSize={takeOperatorSites}
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
