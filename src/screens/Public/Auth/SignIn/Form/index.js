import React, { useState } from "react";
import { Checkbox } from "antd";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Button, Input, Spin } from "shared/components";
import { NAME_SPACES } from "shared/locales/constants";
import { COLORS, PATHS } from "utils/constants";
import { bindInputProps } from "utils/helpers/input";
import validation from "./validation";
import Logo from "shared/assets/images/Logo.svg";
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import { AuthMutations } from "shared/graphql/mutations";
// import SignUpModal from "./signUpModal";
import {USER} from "shared/graphql/queries/user";
import {UserStore} from "shared/store/UserStore";
import { messages } from "utils/helpers/message";

const { LOGIN_MUTATION } = AuthMutations;

const Form = () => {
  const { t } = useTranslation(NAME_SPACES.AUTH);
  const history = useHistory();
  // const [modalSignUp, setModalSignUp] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [getUser] = useLazyQuery(USER, {
    onCompleted: ({user}) => {
      UserStore(user);
      setUserLoading(false);
      history.push(PATHS.HOME);
    }
  });

  // const showModal = () => {
  //   setModalSignUp(true);
  // };

  // const handleCancelModal = () => {
  //   setModalSignUp(false);
  // };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: validation(
      t('ERROR', {
        returnObjects: true,
      })
    ),
    onSubmit: data => signIn({ variables: { data } }),
  });

  const [
    signIn,
    { loading }
  ] = useMutation(LOGIN_MUTATION,
    {
      onCompleted: ({ signin }) => {
        setUserLoading(true);
        localStorage.setItem('username', formik.values.username);
        localStorage.setItem('access_token', signin.accessToken);
        getUser();
      },
      onError: (error) => {
        messages({data: error, msg: t("SIGNIN.ERROR")});
      }
    });

  return (
    <div className={"auth--area--form"}>
      <Spin spinning={loading || userLoading}>
        <div className="auth--area--form--head">
          <img className="logo" src={Logo} alt="Be-better" />
        </div>
        <div className="auth--area--form--content">
          <div className="auth--area--form--content--title">
            <h2>{t("SIGNIN.LOGIN")}</h2>
          </div>
          <div className="auth--area--form--content--inputs">
            <div className="auth--area--form--content--inputs--item">
              <label>{t("SIGNIN.EMAIL")}</label>
              <Input
                {...bindInputProps({ name: "username", ...formik })}
                placeholder={t("SIGNIN.FORM_INPUT_LOGIN_PLACEHOLDER")}
                icon={<span className="icon-Email color-gray" />}
              />
            </div>
            <div className="auth--area--form--content--inputs--item">
              <label>{t("SIGNIN.PASSWORD")}</label>
              <Input
                type="password"
                {...bindInputProps({ name: "password", ...formik })}
                placeholder={t("SIGNIN.FORM_INPUT_PASS_PLACEHOLDER")}
                icon={<span className="icon-Key color-gray" />}
              />
            </div>

          </div>
          <div className="auth--area--form--content--help">
            <div className="auth--area--form--content--help--item">
              <Checkbox >{t("SIGNIN.RMEMBER_ME")}</Checkbox>

            </div>
            <div
              className="auth--area--form--content--help--item"
            >
              <h5
                className="link-auth"
                onClick={() =>
                  history.push({
                    pathname: PATHS.PUBLIC.AUTH.FORGOT,
                  })
                }
              >
                {t("SIGNIN.FORGOT_PASSWORD")}
              </h5>
            </div>
          </div>
          <div className="auth--area--form--footer">
            <Button
              buttonSize={"btn--large"}
              onClick={formik.handleSubmit}
            >
              {t("SIGNIN.LOGIN")}
            </Button>
          </div>
          {/* <div className="auth--area--form--content--help sign-up">
            <div className="auth--area--form--content--help--item">
              <h5>
                {t("SIGNIN.NO_ACCOUNT")} <span className="link-auth" onClick={showModal}>{t("SIGNIN.SIGN_UP_NOW")}</span>
              </h5>
            </div>
          </div> */}
          {/* <SignUpModal t={t} visible={modalSignUp} handleCancel={handleCancelModal} /> */}
        </div>
      </Spin>
    </div>
  );
};
export default Form;
