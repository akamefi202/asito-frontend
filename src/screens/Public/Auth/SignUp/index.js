import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Row, Col, Steps } from "antd";
import { Button, Spin } from "shared/components";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NAME_SPACES } from "shared/locales/constants";
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useFormik } from "formik";
import CompanyInformation from "./CompanyInformation";
import validationCompany from "./CompanyInformation/validation";
import AccountInformation from "./AccountInformation";
import validationAccount from "./AccountInformation/validation";
import EmailVerification from "./EmailVerification";
import AccountSubmitted from "./AccountSubmitted";
import { PATHS, ROLE_URL } from "utils/constants";
import cuid from "cuid";
import { useMutation } from "@apollo/react-hooks";
import { IssuerMutations, UserMutations, AuthMutations } from "shared/graphql/mutations";
import { messages } from "utils/helpers/message";

const { CREATE_UPDATE_ISSUER } = IssuerMutations;
const { CREATE_UPDATE_USER } = UserMutations;
const { SIGNUP } = AuthMutations;


const { Step } = Steps;

const SignUp = () => {
  const history = useHistory();
  const { role } = useParams();
  const [current, setCurrent] = useState(0);
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(NAME_SPACES.SIGN_UP);

  const formikCompany = useFormik({
    initialValues: {
      id: cuid(),
      name: "",
      registrationNumber: "",
      vat: "",
      number: "",
      address1: "",
      address2: "",
      zipCode: "",
      city: "",
      country: "",
      kind: ROLE_URL[role],
      phone: "",
      email: "",
      website: "",
    },
    validationSchema: validationCompany(
      t('FORM.ERROR', {
        returnObjects: true,
      })
    ),
    onSubmit: data => {
      setLoading(true);
      createCompany({ variables: { data } });
    },
  });

  const [
    createCompany
  ] = useMutation(CREATE_UPDATE_ISSUER,
    {
      onCompleted: ({ createIssuer }) => {
        setLoading(false);
        next();
      },
      onError: (error) => {
        setLoading(false);
        messages({ data: error });
      }
    }
  );

  const formikAccount = useFormik({
    initialValues: {
      id: cuid(),
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      issuer: formikCompany.values,
      password: "",
      repetPassword: ""
    },
    validationSchema: validationAccount(
      t('FORM.ERROR', {
        returnObjects: true,
      })
    ),
    onSubmit: data => {
      setLoading(true);
      const dataSignup = {
        id: data.id,
        username: data.email,
        email: data.email,
        phone: data.phone,
        password: data.password,
      }
      signup({ variables: { data: dataSignup } });
    },
  });

  const [
    signup
  ] = useMutation(SIGNUP,
    {
      onCompleted: ({ signup }) => {
        localStorage.setItem('auth_token', signup.accessToken);
        const data = { ...formikAccount.values };
        delete data.password;
        delete data.repetPassword;
        createAccount({ variables: { data } });
      },
      onError: (error) => {
        setLoading(false);
        messages({ data: error });
      }
    }
  );

  const [
    createAccount
  ] = useMutation(CREATE_UPDATE_USER,
    {
      onCompleted: (data) => {
        setLoading(false);
        next();
      },
      onError: (error) => {
        setLoading(false);
        messages({ data: error });
      }
    }
  );

  const steps = [
    {
      title: t("STEPS.COMPANY_INFORMATION"),
      content: <CompanyInformation t={t} formik={formikCompany} />,
    },
    {
      title: t("STEPS.ACCOUNT_INFORMATION"),
      content: <AccountInformation t={t} formik={formikAccount} />,
    },
    {
      title: t("STEPS.EMAIL_VERIFICATION"),
      content: <EmailVerification t={t} email={formikAccount.values.email} />,
    },
  ];

  const requestApi = () => {
    switch (current) {
      case 0:
        formikCompany.handleSubmit();
        break;
      case 1:
        formikAccount.handleSubmit();
        break;
      case 2:
        next();
        break;
      default:
        next();
    }
  }

  const completeSteps = () => {
    localStorage.removeItem('auth_token');
    setComplete(true);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    if (current === 0) {
      backToLogin();
    } else {
      setCurrent(current - 1);
    }
  };

  const backToLogin = () => {
    history.push(PATHS.PUBLIC.AUTH.SIGN_IN);
  }

  return (
    <Layout className={"container--signUp"}>
      <Row justify="center" align="middle" className="h-100vh">
        <Col span={24} className={`wrapper--content ${complete ? 'wrapper--content--complete' : ''}`}>
          <Spin spinning={loading}>
            {complete
              ? <AccountSubmitted t={t} email={formikAccount.values.email} backToLogin={backToLogin} />
              : (
                <div className="details--page">
                  <h1 className="title">{t(`REGISTRATION.${role.toUpperCase()}`)}</h1>
                  <Steps current={current} className="custom--steps">
                    {steps.map(item => (
                      <Step key={item.title} title={item.title} />
                    ))}
                  </Steps>
                  <div className="steps--content">{steps[current].content}</div>
                  <div className={`steps--action ${current === steps.length - 1 ? 'steps--action--end' : ''}`}>
                    {current < steps.length - 1 && (
                      <Button
                        buttonStyle="btn--outline"
                        custom="heading--area--buttons--left"
                        onClick={prev}
                      >
                        <ArrowLeftOutlined className="btn--icon--right" />
                        {current === 0
                          ? t('GO_BACK')
                          : t('PREVIOUS_STEP')
                        }
                      </Button>
                    )}
                    {current < steps.length - 1 && (
                      <Button onClick={requestApi}>
                        {t("NEXT_STEP")} <ArrowRightOutlined className="btn--icon--left" />
                      </Button>
                    )}
                    {current === steps.length - 1 && (
                      <Button onClick={completeSteps}>
                        {t("COMPLETE")}  <ArrowRightOutlined className="btn--icon--left" />
                      </Button>
                    )}
                  </div>
                </div>
              )
            }
          </Spin>
        </Col>
      </Row>
    </Layout>
  );
};

export default SignUp;
