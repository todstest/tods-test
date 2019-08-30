import React from "react";
import styled from "styled-components/macro";
import { Spin, Icon, Alert } from "antd";

export default function LoadingSpinner() {
  return (
    <Spin size="large" indicator={<Icon type="loading" spin />}>
      <StyledAlert
        message="Feedback"
        description="Simulating a slow call that ends with a 200 response..."
        type="info"
      />
    </Spin>
  );
}

const StyledAlert = styled(Alert)`
  max-width: 60% !important;
  text-align: center !important;
  margin: 0 auto !important;
`;
