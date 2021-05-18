import React from "react";
import { Spin } from "shared/components";
import { useMutation } from "@apollo/react-hooks";
import { AuthMutations } from "shared/graphql/mutations";
import { messages } from "utils/helpers/message";

const { RESND_EMAIL_VERIFICATION } = AuthMutations;

export default ({ t, formik, email }) => {
  const [
    resendEmail,
    {loading}
  ] = useMutation(RESND_EMAIL_VERIFICATION,
    {
      onCompleted: () => {
        messages({ msg: t('FORM.EMAIL_VERIFICATION.SUCCESS'), type: 'success' });
      },
      onError: (error) => {
        messages({ data: error });
      }
    }
  );

  return (
    <div className="card--form">
      <Spin spinning={loading}>
        <h1 className="card--form--text resend--email">
          {`${t("FORM.EMAIL_VERIFICATION.SENT.PART_ONE")} ${email}${t("FORM.EMAIL_VERIFICATION.SENT.PART_TWO")}`}
        </h1>
        <p className="card--form--text resend--email">
          {t("FORM.EMAIL_VERIFICATION.NOT_RECEIVE")} <span onClick={resendEmail} className="custom-link">
            {t("FORM.EMAIL_VERIFICATION.RESEND_EMAIL")}
          </span>
        </p>
      </Spin>
    </div>
  );
}
