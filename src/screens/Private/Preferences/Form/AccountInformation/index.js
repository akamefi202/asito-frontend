import React from "react";
import { Row, Col } from "antd";
import { Card, Input, Button, Spin } from "shared/components";
import { useFormik } from "formik";
import { bindInputProps } from "utils/helpers/input";
import validation from "./validation";
import { UserMutations } from "shared/graphql/mutations";
import { useMutation } from "@apollo/react-hooks";
import { messages } from "utils/helpers/message";
import { fieldsQqual } from "utils/helpers/check";
import { REQUIRED_FIELD_SYMBOL } from "utils/constants";

const { CREATE_UPDATE_USER } = UserMutations;

export default ({ t, user }) => {

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: user ? user.id : '',
      phone: user ? user.phone : '',
      firstName: user ? user.firstName : '',
      lastName: user ? user.lastName : '',
      email: user ? user.email : '',
    },
    validationSchema: validation(t('FORM.ERROR', {returnObjects: true})),
    onSubmit: data => saveChanges({ variables: { data } })
  });

  const [saveChanges, {loading}] = useMutation(CREATE_UPDATE_USER, {
    onCompleted: (data) => messages({msg: t("FORM.ACCOUNT_INFORMATION.SUCCESS"), type: "success"}),
    onError: (error) => messages({data: error})
  });

  const discardChanges = () => formik.resetForm();

  return (
    <Card cardStyle={"card--form"}>
      <Spin spinning={loading}>
        <Row>
          <Col xs={24}>
            <h2 className="card--form--title">
              {t("FORM.MENU.ACCOUNT_INFORMATION")}
            </h2>
          </Col>
        </Row>
        <Row gutter={[16, 8]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="card--form--item">
              <label className="card--form--item--label">
                {t("FORM.ACCOUNT_INFORMATION.FIRST_NAME")} { REQUIRED_FIELD_SYMBOL }
              </label>
              <Input
                {...bindInputProps({ name: "firstName", ...formik })}
                placeholder={t("FORM.ACCOUNT_INFORMATION.FIRST_NAME_PLACEHOLDER")}
              />
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="card--form--item">
              <label className="card--form--item--label">
                {t("FORM.ACCOUNT_INFORMATION.LAST_NAME")} { REQUIRED_FIELD_SYMBOL }
              </label>
              <Input
                {...bindInputProps({ name: "lastName", ...formik })}
                placeholder={t("FORM.ACCOUNT_INFORMATION.LAST_NAME_PLACEHOLDER")}
              />
            </div>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="card--form--item">
              <label className="card--form--item--label">
                {t("FORM.ACCOUNT_INFORMATION.EMAIL_ADDRESS")} { REQUIRED_FIELD_SYMBOL }
              </label>
              <Input
                {...bindInputProps({ name: "email", ...formik })}
                placeholder={t("FORM.ACCOUNT_INFORMATION.EMAIL_ADDRESS_PLACEHOLDER")}
              />
            </div>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24}>
            <div className="heading--area--buttons heading--area--buttons--end">
              <Button
                buttonStyle={"btn--outline"}
                disabled={fieldsQqual(formik.initialValues, formik.values)}
                custom={"heading--area--buttons--left"}
                onClick={discardChanges}
              >
                {t("FORM.ACCOUNT_INFORMATION.REVERT_CHANGES")}
              </Button>
              <Button
                disabled={fieldsQqual(formik.initialValues, formik.values)}
                onClick={formik.handleSubmit}
              >
                <span className="icon-Check btn--icon--right" /> {t("FORM.ACCOUNT_INFORMATION.SAVE_CHANGES")}
              </Button>
            </div>
          </Col>
        </Row>
      </Spin>
    </Card>
  );
};
