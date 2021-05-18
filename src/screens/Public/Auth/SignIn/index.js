import React from "react";
import { Layout, Row, Col } from "antd";
import Form from "./Form";

const SignIn = () => {
  const { Content } = Layout;
  return (
    <Layout className={"container--auth"}>
      <Content className={"auth--area"}>
        <Row justify="center" align="middle" className="h-100vh">
          <Form />
        </Row>
      </Content>
    </Layout>
  );
};
export default SignIn;
