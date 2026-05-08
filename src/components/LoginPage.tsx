import React, { useState, useEffect } from "react";
import { Button, Card, Input, Typography, Form, message, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [serviceUrl, setServiceUrl] = useState("");

  useEffect(() => {
    // Get parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    let service = urlParams.get("service") || "";
    const app = urlParams.get("appCode") || "";

    // Remove trailing slash if present
    if (service.endsWith("/")) {
      service = service.slice(0, -1);
    }

    console.log("app", app);
    console.log("service", service);
    console.log("urlParams", urlParams);

    setServiceUrl(service);
  }, []);

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    if (!serviceUrl) {
      message.error("Error: No service URL provided!");
      return;
    }

    setLoading(true);

    // Simulate processing
    setTimeout(() => {
      const ticket = values.username; // Use username as ticket

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
        background:
          "radial-gradient(circle at 10% 20%, #dbeafe 0%, #e0e7ff 35%, #f5f3ff 65%, #f8fafc 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "440px",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.7)",
          boxShadow: "0 16px 40px rgba(15, 23, 42, 0.12)",
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.9)",
        }}
        bodyStyle={{ padding: "32px 28px 24px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <Space direction="vertical" size={4}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#4f46e5",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Secure Access
            </Text>
            <Title
              level={2}
              style={{
                margin: 0,
                color: "#0f172a",
                fontWeight: 700,
              }}
            >
              Login Portal
            </Title>
            <Text type="secondary" style={{ fontSize: 14 }}>
              Authentication Service
            </Text>
          </Space>
        </div>

        <Form
          initialValues={{ username: "", password: "" }}
          onFinish={handleLogin}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter username!" }]}
            style={{ marginBottom: "14px" }}
          >
            <Input
              prefix={<UserOutlined style={{ color: "#94a3b8" }} />}
              placeholder="Username"
              style={{ borderRadius: "10px", height: "44px" }}
            />
          </Form.Item>

          <Form.Item name="password" style={{ marginBottom: "20px" }}>
            <Input.Password
              prefix={<LockOutlined style={{ color: "#94a3b8" }} />}
              placeholder="Password"
              style={{ borderRadius: "10px", height: "44px" }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: "10px" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                width: "100%",
                height: "44px",
                borderRadius: "10px",
                fontWeight: 600,
                background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
                border: "none",
                boxShadow: "0 8px 20px rgba(79, 70, 229, 0.35)",
              }}
            >
              {loading ? "Processing..." : "Login"}
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center", marginTop: "8px" }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Your session is protected and encrypted.
          </Text>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;
