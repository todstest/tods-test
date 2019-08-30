import React from "react";
import { Result, Button } from "antd";
import { A } from "hookrouter";
import { Helmet } from "react-helmet";

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>MyBrand - Page not found</title>
      </Helmet>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <A href="/">
            <Button type="primary">Back Home</Button>
          </A>
        }
      />
    </>
  );
}
