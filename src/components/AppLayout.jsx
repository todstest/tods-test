import React, { Suspense } from "react";
import { Row, Col, Typography, Button, BackTop } from "antd";
import styled from "styled-components/macro";
import { A } from "hookrouter";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { useStoreState } from "easy-peasy";

import LoadingSpinner from "./LoadingSpinners/PageLoadingSpinner";

const { Title } = Typography;

export default function AppLayout({ appContent }) {
  const reward = useStoreState(state => state.confetti.confetti);
  const { width, height } = useWindowSize();

  return (
    <main>
      {reward && <Confetti width={width} height={height} />}
      <Row type="flex" justify="center">
        <Navbar>
          <A href="/">
            <NavbarButton size="large" type="primary" icon="home">
              Homepage
            </NavbarButton>
          </A>
          <A href="/cart">
            <NavbarButton size="large" type="primary" icon="shopping-cart">
              Cart
            </NavbarButton>
          </A>
        </Navbar>
        <Col span={24}>
          <Brand level={1}>MyBrand</Brand>
        </Col>
        <Col xs={22} sm={22} md={22} lg={20} xl={18}>
          <Suspense fallback={<LoadingSpinner />}>
            <>
              <BackTop />
              {appContent}
            </>
          </Suspense>
        </Col>
      </Row>
    </main>
  );
}

const Brand = styled(Title)`
  padding-bottom: 2rem;
  text-transform: uppercase;
  font-size: 3rem !important;
  text-align: center;
`;

const Navbar = styled.div`
  text-align: right;
  width: 100%;
  @media (max-width: 420px) {
    text-align: center;
  }
`;

const NavbarButton = styled(Button)`
  margin: 1rem;
  min-width: 10rem;
  @media (max-width: 420px) {
    min-width: 9rem;
  }
`;
