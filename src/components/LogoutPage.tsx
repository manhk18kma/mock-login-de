// src/components/LogoutPage.tsx
import React, { useState, useEffect } from "react";
import { Card, Typography, Spin, Result } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function LogoutPage() {
  const [loading, setLoading] = useState(true);
  const [serviceUrl, setServiceUrl] = useState("");

  useEffect(() => {
    // Get parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get("service") || "";
    const ticketParam = urlParams.get("ticket") || "";

    console.log("ticket", ticketParam);
    console.log("service", service);
    console.log("urlParams", urlParams);

    setServiceUrl(service);

    // Simulate logout process
    handleLogout(service);
  }, []);

  const handleLogout = (service: string) => {
    setLoading(true);

    // Simulate logout processing
    setTimeout(() => {
      setLoading(false);

      // Auto redirect if service URL provided
      if (service) {
        setTimeout(() => {
          window.location.href = service;
        }, 500);
      }
    }, 1000);
  };

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
            <Text type="secondary">Please wait while we log you out</Text>
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
          subTitle={
            serviceUrl
              ? "Redirecting to application..."
              : "You have been logged out of the system."
          }
        />

        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "#f6ffed",
            borderRadius: "4px",
            fontSize: "12px",
            border: "1px solid #b7eb8f",
          }}
        >
          <Text strong style={{ color: "#52c41a" }}>
            Logout completed successfully
          </Text>
        </div>
      </Card>
    </div>
  );
}

export default LogoutPage;
