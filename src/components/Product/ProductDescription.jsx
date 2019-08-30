import React from "react";
import { Typography } from "antd";
import { Badge } from "antd";
import styled from "styled-components/macro";

const { Text, Title, Paragraph } = Typography;

const ProductDescription = ({
  sku,
  name,
  price,
  description,
  availability,
  discountedPrice
}) => {
  return (
    <SpaceDown distance={36}>
      <SpaceDown>
        <TextRight>
          <Text type="secondary">SKU: {sku}</Text>
        </TextRight>
      </SpaceDown>
      <Title level={2}>{name}</Title>
      <SpaceDown>
        {discountedPrice ? (
          <>
            <div>
              <Text type="secondary" delete>
                {price} €
              </Text>
            </div>
            <Text strong className="price-color">
              {discountedPrice} €
            </Text>
          </>
        ) : (
          <Text strong className="price-color">
            {price} €
          </Text>
        )}
      </SpaceDown>
      <SpaceDown>
        {availability ? (
          <Badge status="success" text="Available" />
        ) : (
          <Badge status="error" text="Out of stock" />
        )}
      </SpaceDown>
      <Paragraph>{description}</Paragraph>
    </SpaceDown>
  );
};

const TextRight = styled.div`
  text-align: right;
`;

const SpaceDown = styled.div`
  margin-bottom: ${props => props.distance || 12}px;
`;

export default ProductDescription;
