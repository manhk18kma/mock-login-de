// src/components/LogoutPage.tsx
import React, { useState, useEffect } from "react";
import { Card, Typography, Spin, Result } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function LogoutPage() {
  const [loading, setLoading] = useState(true);
  const [serviceUrl, setServiceUrl] = useState("");

  useEffect(() => {
    try {
      // Get parameters from URL
      const urlParams = new URLSearchParams(window.location.search);
      const service = urlParams.get("service") || "";
      const ticket = urlParams.get("ticket") || "";

      console.log('LogoutPage loaded:', { service, ticket });

      setServiceUrl(service);

      // Start logout process
      setTimeout(() => {
        console.log('Logout process complete');

        if (service) {
          console.log('Redirecting to:', service);
          setTimeout(() => {
            window.location.href = service;
          }, 1500);
        } else {
          setLoading(false);
        }
      }, 1000);

    } catch (error) {
      console.error('LogoutPage error:', error);
      setLoading(false);
    }
  }, []);

  if (loading) {
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
        <Card style={{ width: "100%", maxWidth: "400px", textAlign: "center" }}>
          <Spin size="large" />
          <div style={{ marginTop: "20px" }}>
            <Title level={3} style={{ color: "#ff4d4f" }}>
              Processing logout...
            </Title>
            <Text type="secondary">
              {serviceUrl ? "Redirecting to application..." : "Please wait while we log you out"}
            </Text>
          </div>
        </Card>
      </div>
    );
  }

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
        <Result
          icon={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
          title="Logout Successful!"
          subTitle="You have been logged out of the system."
        />
      </Card>
    </div>
  );
}

export default LogoutPage;
