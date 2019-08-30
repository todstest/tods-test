import React from "react";
import { Spin, Icon } from "antd";

export default function LoadingSpinner() {
  return <Spin indicator={<Icon type="loading" spin />} />;
}
