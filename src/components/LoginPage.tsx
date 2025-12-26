import React, { useState, useEffect } from "react";
import { Button, Card, Input, Typography, Form, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [serviceUrl, setServiceUrl] = useState("");
  const [appCode, setAppCode] = useState("");

  useEffect(() => {
    // Get parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    let service = urlParams.get("service") || "";
    const app = urlParams.get("appCode") || "";

    // Remove trailing slash if present
    if (service.endsWith("/")) {
      service = service.slice(0, -1);
    }

    setServiceUrl(service);
    setAppCode(app);
  }, []);

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    if (!serviceUrl) {
      message.error("Error: No service URL provided!");
      return;
    }

    if (!values.username) {
      message.error("Please enter username!");
      return;
    }

    setLoading(true);

    // Simulate processing - mock authentication only needs username
    setTimeout(() => {
      const ticket = values.username; // Use username as ticket for mock

      message.success("Login successful! Redirecting...");

      // Redirect to service with ticket
      setTimeout(() => {
        // Ensure serviceUrl has no trailing slash
        const callbackUrl = `${serviceUrl.replace(
          /\/+$/,
          ""
        )}?ticket=${ticket}`;
        window.location.href = callbackUrl;
      }, 1000);
    }, 500);
  };

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
      <Card style={{ width: "100%", maxWidth: "400px" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <Title level={2} style={{ color: "#1890ff" }}>
            Login Portal
          </Title>
          <Text type="secondary">Authentication Service</Text>
        </div>

        <Form
          initialValues={{ username: "", password: "" }}
          onFinish={handleLogin}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter ticket/username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Ticket/Username" />
          </Form.Item>

          <Form.Item
            name="password"
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password (optional)" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%" }}
            >
              {loading ? "Processing..." : "Login"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;
