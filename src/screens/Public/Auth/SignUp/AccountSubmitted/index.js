import React from "react";
import {FiKey} from "react-icons/fi";
import {BsCheck} from "react-icons/bs";
import {Button} from "shared/components";

export default ({ t, email, backToLogin }) => {
  return (
    <div className="card--form account--submited">
      <div className="icon--check">
          <BsCheck />
      </div>
      <h1 className="title">
        {t("FORM.ACCOUNT_SUBMITTED.WELCOME")}
      </h1>

      <p className="card--form--text">
      {t("FORM.ACCOUNT_SUBMITTED.LOGIN_ACCOUNT")} {email}.
      </p>
      <Button
        buttonStyle="btn--outline"
        custom="heading--area--buttons--left"
        onClick={backToLogin}
      >
        <FiKey className="btn--icon--right" />
        {t("FORM.ACCOUNT_SUBMITTED.BACK_LOGIN")}
      </Button>
    </div>
  );
}
