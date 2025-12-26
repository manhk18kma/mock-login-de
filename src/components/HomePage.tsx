// src/components/HomePage.tsx
import React from "react";
import { Card, Typography, Button, Space, Divider } from "antd";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

function HomePage() {
  const currentHost = window.location.origin;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f2f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Card style={{ width: "100%", maxWidth: "600px" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <Title level={2} style={{ color: "#1890ff" }}>
            Mock Authentication Portal
          </Title>
          <Text type="secondary">Development Authentication Service</Text>
        </div>

        <Divider orientation="left">Available Routes</Divider>

        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <Card type="inner" title="Login Endpoint" extra={<LoginOutlined />}>
            <Paragraph>
              <Text strong>URL:</Text> {currentHost}/sso/login
            </Paragraph>
            <Paragraph>
              <Text strong>Parameters:</Text>
              <ul>
                <li>
                  <Text code>service</Text> - Callback URL after login
                </li>
                <li>
                  <Text code>appCode</Text> - Application code
                </li>
              </ul>
            </Paragraph>
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={() => (window.location.href = "/sso/login")}
            >
              Test Login
            </Button>
          </Card>

          <Card type="inner" title="Logout Endpoint" extra={<LogoutOutlined />}>
            <Paragraph>
              <Text strong>URL:</Text> {currentHost}/sso/logout
            </Paragraph>
            <Paragraph>
              <Text strong>Parameters:</Text>
              <ul>
                <li>
                  <Text code>ticket</Text> - Session ticket to invalidate
                </li>
                <li>
                  <Text code>service</Text> - Callback URL after logout
                </li>
                <li>
                  <Text code>appCode</Text> - Application code
                </li>
              </ul>
            </Paragraph>
            <Button
              type="default"
              icon={<LogoutOutlined />}
              onClick={() => (window.location.href = "/sso/logout")}
            >
              Test Logout
            </Button>
          </Card>
        </Space>

        <Divider orientation="left" style={{ marginTop: "30px" }}>
          System Behavior
        </Divider>

        <div
          style={{
            background: "#f9f9f9",
            padding: "15px",
            borderRadius: "4px",
          }}
        >
          <Text strong>Login Flow:</Text>
          <ul>
            <li>Accepts user credentials</li>
            <li>Generates authentication ticket</li>
            <li>Redirects to service URL with ticket</li>
          </ul>

          <Text strong>Logout Flow:</Text>
          <ul>
            <li>Invalidates user session</li>
            <li>Clears session data</li>
            <li>Redirects back to service URL</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}

export default HomePage;
