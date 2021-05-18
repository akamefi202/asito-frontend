import React from "react";
import {Row, Col} from "antd";
import Card from "shared/components/Card";
import {Input} from "shared/components";
import {bindInputProps} from "utils/helpers/input";

export default ({t, formik}) => {
    return (
        <Card cardStyle={"card--form"}>
            <Row>
                <Col xs={24}>
                    <h2 className="card--form--title">
                        {t("FORM.MENU.ISSUER_INFORMATION")}
                    </h2>
                </Col>
            </Row>
            <Row gutter={[16, 8]}>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <div className="card--form--item">
                        <label className="card--form--item--label">
                            {t("FORM.ISSUER_INFORMATION.SIGNED_BY")}
                        </label>
                        <Input
                            placeholder={t("FORM.ISSUER_INFORMATION.SIGNED_BY_PLACEHOLDER")}
                            {...bindInputProps({name: "signedBy", ...formik})}
                        />
                    </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <div className="card--form--item">
                        <label className="card--form--item--label">
                            {t("FORM.ISSUER_INFORMATION.SIGNERS_TITLE")}
                        </label>
                        <Input
                            placeholder={t("FORM.ISSUER_INFORMATION.SIGNERS_TITLE_PLACEHOLDER")}
                            {...bindInputProps({name: "signerTitle", ...formik})}
                        />
                    </div>
                </Col>
            </Row>
        </Card>
    );
}
