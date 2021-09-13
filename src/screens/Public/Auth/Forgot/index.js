import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { Col, Layout, Row, Steps } from "antd";
import { NAME_SPACES } from "shared/locales/constants";
import { Button, Input, Spin } from "shared/components";
import { bindInputProps } from "utils/helpers/input";
import { PATHS } from "utils/constants";
import validation from "./validation";
import { ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined } from "@ant-design/icons";
import Logo from "shared/assets/images/Logo.svg";
import { useMutation } from "@apollo/react-hooks";
import { ForgetPasswordMutations } from "shared/graphql/mutations";
import { messages } from "utils/helpers/message";
import { checkRecaptcha } from "utils/helpers/recaptcha";

const { FORGET_PASSWORD } = ForgetPasswordMutations;

const FORGOT = () => {
    const history = useHistory();
    const { t } = useTranslation(NAME_SPACES.AUTH);
    const [sendMode, setSendMode] = useState(false);

    const [sendEmail, { loading }] = useMutation(FORGET_PASSWORD, {
        onCompleted: ({ forgetPassword }) => {
            if (forgetPassword === 'OK') {
                messages({ msg: t('FORGOT.SEND_BY'), type: 'success' });
                backToLogin();
            }
        },
        onError: (error) => {
            setSendMode(false);
            messages({ data: error });
        }
    });

    const formik = useFormik({
        initialValues: { email: "", },
        validationSchema: validation(t('ERROR', { returnObjects: true })),
        onSubmit: (data) => {
            setSendMode(true);
            checkRecaptcha().then((token) => {
                return sendEmail({
                  variables: { data },
                  context: {
                    headers: {
                      "X-ReCaptcha": token
                    }
                  }
                });
            });
        }
    });

    const backToLogin = () => history.push(PATHS.PUBLIC.AUTH.SIGN_IN);

    return (
        <Layout className="container--signUp">
            <Row justify="center" align="middle" className="custom-h">
                <div className="auth--area--form--head">
                    <img className="logo" src={Logo} alt="Be-better" />
                </div>
                <Col span={24} className="wrapper--content">
                    <div className="auth--area--form">
                        <Spin spinning={loading}>
                            <div className="details--page">
                                <h1 className="forgot-title">{t("FORGOT.FORGOT_PASSWORD")}</h1>
                                <Steps className="custom--steps" />
                                <p className="text">{t("FORGOT.TEXT")}</p>
                                <div className="steps--custom">
                                    <div className="auth--area--form--content--inputs">
                                        <div className="auth--area--form--content--inputs--item">
                                            <label style={{ color: "#808080" }}>{t("FORGOT.EMAIL")}</label>
                                            <Input placeholder={t("FORGOT.EMAIL_PLACEHOLDER")}
                                                {...bindInputProps({ name: "email", ...formik })}
                                                icon={<span className="icon-Email color-gray" />}
                                                disabled={sendMode} />
                                        </div>
                                    </div>
                                </div>
                                <div className="steps--action">
                                    <Button buttonStyle="btn--outline"
                                        custom="heading--area--buttons--left"
                                        onClick={backToLogin}>
                                        <ArrowLeftOutlined className="btn--icon--right" />
                                        {t("FORGOT.GO_BACK")}
                                    </Button>
                                    <Button type="submit"
                                        buttonStyle={!sendMode && "btn--large btn--outline"}
                                        customDisabledClass={sendMode && "green-text"}
                                        disabled={sendMode}
                                        onClick={formik.handleSubmit}>
                                        {sendMode && <CheckOutlined className="btn--icon--custom-right" />}
                                        {sendMode ? t("FORGOT.SEND_BY") : t("FORGOT.SEND")}
                                        {!sendMode && <ArrowRightOutlined className="btn--icon--left" />}
                                    </Button>
                                </div>
                            </div>
                        </Spin>
                    </div>
                </Col>
            </Row>
        </Layout>
    );
};
export default FORGOT;
