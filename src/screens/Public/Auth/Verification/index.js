import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Spin } from "shared/components";
import { useMutation } from "@apollo/react-hooks";
import { AuthMutations } from "shared/graphql/mutations";
import { messages } from "utils/helpers/message";
import { PATHS } from "utils/constants";
import { useTranslation } from "react-i18next";
import { NAME_SPACES } from "shared/locales/constants";

const { VERIFY_EMAIL } = AuthMutations;


const Verification = () => {
  const history = useHistory();
  const { t } = useTranslation(NAME_SPACES.AUTH);

  useEffect(() => {
    const params = new URLSearchParams(history.location.search);
    verifyEmail({
      variables: {
        data: {
          id: params.get('id'),
          code: params.get('code')
        }
      }
    });
  }, []);

  const [verifyEmail] = useMutation(VERIFY_EMAIL,
    {
      onCompleted: ({verifyEmail}) => {
        if (verifyEmail !== 'OK') return
        messages({ msg: t('VERIFICATION.EMAIL_VERIFID'), type: 'success' });
        localStorage.removeItem('auth_token');
        history.push(PATHS.PUBLIC.AUTH.SIGN_IN);
      },
      onError: (error) => {
        messages({ data: error });
        history.push(PATHS.PUBLIC.AUTH.SIGN_IN);
      }
    }
  );

  return (
    <Spin spinning={true} isLoadApp={true} />
  );
};

export default Verification;
