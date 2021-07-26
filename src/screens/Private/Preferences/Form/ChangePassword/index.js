import React, { useState } from "react";
import { Row, Col } from "antd";
import { Card, Input, Button, Spin } from "shared/components";
import { useFormik } from "formik";
import { bindInputProps } from "utils/helpers/input";
import validation from "./validation";
import { AuthMutations } from "shared/graphql/mutations";
import { AuthQueries } from "shared/graphql/queries";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { messages } from "utils/helpers/message";
import { fieldsNotEmpty } from "utils/helpers/check";
import { REQUIRED_FIELD_SYMBOL } from "utils/constants";

const { UPDATE_USER } = AuthMutations;
const { USER_AUTH } = AuthQueries;

export default ({ t, user }) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      currentPassword: "",
      confirmNewPassword: "",
      newPassword: "",
    },
    validationSchema: validation(
      t('FORM.ERROR', {
        returnObjects: true,
      })
    ),
    onSubmit: data => {
      setLoading(true);
      checkUser();
    },
  });

  const [checkUser] = useLazyQuery(USER_AUTH, {
    variables: {
      where: { id: user.id }
    },
    fetchPolicy: "no-cache",
    onCompleted: ({ user: userAuth }) => {
      if (userAuth.password === formik.values.currentPassword) {
        changePassword({
          variables: {
            data: {
              id: user.id,
              password: formik.values.newPassword
            }
          }
        });
      } else {
        setLoading(false);
        messages({ msg: t("FORM.CHANGE_PASSWORD.INVALID_CURRENT_PASSWORD") });
      }
    },
    onError: (error) => {
      setLoading(false);
      messages({ data: error });
    }
  });

  const [changePassword] = useMutation(UPDATE_USER,
    {
      onCompleted: (data) => {
        messages({ msg: t("FORM.CHANGE_PASSWORD.PASSWORD_CHANGED"), type: "success" });
        setLoading(false);
      },
      onError: (error) => {
        setLoading(false);
        messages({ data: error });
      }
    }
  );

  return (
    <Card cardStyle={"card--form"}>
      <Spin spinning={loading}>
        <Row>
          <Col xs={24}>
            <h2 className="card--form--title">
              {t("FORM.MENU.CHANGE_PASSWORD")}
            </h2>
            <p className="card--form--text">{t("FORM.CHANGE_PASSWORD.HINT")}</p>
          </Col>
        </Row>

        <Row gutter={[16, 8]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="card--form--item">
              <label className="card--form--item--label">
                {t("FORM.CHANGE_PASSWORD.CURRENT_PASSWORD")} { REQUIRED_FIELD_SYMBOL }
              </label>
              <Input
                {...bindInputProps({ name: "currentPassword", ...formik })}
                type="password"
                placeholder={t("FORM.CHANGE_PASSWORD.CURRENT_PASSWORD_PLACEHOLDER")}
              />
            </div>
          </Col>
        </Row>

        <Row gutter={[16, 8]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="card--form--item">
              <label className="card--form--item--label">
                {t("FORM.CHANGE_PASSWORD.NEW_PASSWORD")} { REQUIRED_FIELD_SYMBOL }
              </label>
              <Input
                {...bindInputProps({ name: "newPassword", ...formik })}
                type="password"
                placeholder={t("FORM.CHANGE_PASSWORD.NEW_PASSWORD_PLACEHOLDER")}
              />
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="card--form--item">
              <label className="card--form--item--label">
                {t("FORM.CHANGE_PASSWORD.REPEAT_NEW_PASSWORD")} { REQUIRED_FIELD_SYMBOL }
              </label>
              <Input
                {...bindInputProps({ name: "confirmNewPassword", ...formik })}
                type="password"
                placeholder={t("FORM.CHANGE_PASSWORD.REPEAT_NEW_PASSWORD_PLACEHOLDER")}
              />
            </div>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24}>
            <div className="heading--area--buttons heading--area--buttons--end">
              <Button
                disabled={!fieldsNotEmpty(formik.values)}
                onClick={formik.handleSubmit}
              >
                <span className="icon-Key btn--icon--right" /> {t("FORM.CHANGE_PASSWORD.CHANGE_PASSWORD")}
              </Button>
            </div>
          </Col>
        </Row>
      </Spin>
    </Card>
  );
};
