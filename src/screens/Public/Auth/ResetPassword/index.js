import React from "react";
import {Col, Layout, Row, Steps} from "antd";
import Logo from "shared/assets/images/Logo.svg";
import {Button, Input, Spin} from "shared/components";
import {bindInputProps} from "utils/helpers/input";
import {useHistory, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {NAME_SPACES} from "shared/locales/constants";
import {useFormik} from "formik";
import validation from "./validation";
import {CheckOutlined} from "@ant-design/icons";
import {useMutation} from "@apollo/react-hooks";
import {messages} from "utils/helpers/message";
import {ResetPasswordMutations} from "shared/graphql/mutations";

const {RESET_PASSWORD, VERIFY_RESET_PASSWORD_LINK} = ResetPasswordMutations;

const ResetPassword = () => {
    const history = useHistory();
    const {t} = useTranslation(NAME_SPACES.AUTH);
    const urlParams = new URLSearchParams(useLocation().search);
    const id = urlParams.get("id");
    const code = urlParams.get("code");

    const [resetPassword, {loading}] = useMutation(RESET_PASSWORD);
    const [verifyResetPasswordLink, {loading: verifyLoading}] = useMutation(VERIFY_RESET_PASSWORD_LINK);

    const formik = useFormik({
        initialValues: {newPassword: "", repeatPassword: ""},
        validationSchema: validation(t('ERROR', {returnObjects: true})),
        onSubmit: ({newPassword}) => {
            const resetPasswordData = {password: newPassword};
            const verify = {id, code};
            verifyResetPasswordLink({variables: {data: verify}})
                .then(({data}) => setNewPassword(data, resetPasswordData))
                .catch(error => messages({data: error, msg: "Invalid password, please try again"}));
        }
    });

    const setNewPassword = (data, resetPasswordData) => {
        localStorage.setItem('access_token', data.verifyResetPasswordLink);
        resetPassword({variables: {data: resetPasswordData}})
            .then(() => {
                localStorage.removeItem('access_token');
                history.replace('/sign-in');
            })
            .catch(error => {
                localStorage.removeItem('access_token');
                messages({data: error, msg: "Invalid password, please try again"})
            });
    }

    return (
        <Layout className="container--signUp">
            <Row justify="center" align="middle" className="custom-h-change-password">
                <div className="auth--area--form--head">
                    <img src={Logo} alt="Mammoet"/>
                </div>
                <Col span={24} className="wrapper--content change-password">
                    <div className="auth--area--form">
                        <Spin spinning={loading || verifyLoading}>
                            <div className="details--page">
                                <h1 className="forgot-title">{t("CHANGE_PASSWORD.HEADER")}</h1>
                                <Steps className="custom--steps"/>
                                <p className="text">{t("CHANGE_PASSWORD.TEXT")}</p>
                                <div className="steps--custom">
                                    <div>
                                        <label style={{color: "#808080"}}>{t("CHANGE_PASSWORD.NEW_PASSWORD")}</label>
                                        <Input type="password"
                                               placeholder={t("CHANGE_PASSWORD.PLACEHOLDER_NEW_PASSWORD")}
                                               {...bindInputProps({name: "newPassword", ...formik})}/>
                                    </div>
                                    <div className="steps--custom--second--field">
                                        <label style={{color: "#808080"}}>{t("CHANGE_PASSWORD.REPEAT_PASSWORD")}</label>
                                        <Input type="password"
                                               placeholder={t("CHANGE_PASSWORD.PLACEHOLDER_REPEAT_PASSWORD")}
                                               {...bindInputProps({name: "repeatPassword", ...formik})}/>
                                    </div>
                                </div>
                                <div className="steps--action">
                                    <Button type="submit"
                                            custom="change--password--btn"
                                            onClick={formik.handleSubmit}>
                                        <CheckOutlined className="btn--icon--change-password-right"/>
                                        {t("CHANGE_PASSWORD.BUTTON")}
                                    </Button>
                                </div>
                            </div>
                        </Spin>
                    </div>
                </Col>
            </Row>
        </Layout>
    )
}

export default ResetPassword;
