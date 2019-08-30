import React from "react";
import { useStoreState } from "easy-peasy";
import { Row, Col } from "antd";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet";
import ReactImageMagnify from "react-image-magnify";
import useWindowSize from "react-use/lib/useWindowSize";

import AddToCartButton from "../AddToCartButton";
import ProductDescription from "./ProductDescription";

const ProductDetails = ({ id }) => {
  const { width } = useWindowSize();
  const products = useStoreState(state => state.products.products);
  const selectedProduct = products.find(
    product => product.id.toString() === id
  );
  const {
    name,
    price,
    sku,
    description,
    image,
    availability,
    isOnSale,
    discountedPrice
  } = selectedProduct;

  return (
    <div
      className="react-transition fade-in"
      style={{ animationDuration: ".5s" }}
    >
      <Helmet>
        <title>
          MyBrand - {name} - {id}
        </title>
      </Helmet>
      <Row type="flex" justify="center" gutter={24}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <SpaceDown>
            {width < 770 ? (
              <ResponsiveImage src={image} alt={name} />
            ) : (
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: name,
                    isFluidWidth: true,
                    src: image
                  },
                  largeImage: {
                    src: image,
                    width: 1600,
                    height: 2400
                  },
                  enlargedImageContainerStyle: { zIndex: 1 },
                  isHintEnabled: true,
                  shouldHideHintAfterFirstActivation: false
                }}
              />
            )}
          </SpaceDown>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <ProductDescription
            sku={sku}
            name={name}
            description={description}
            availability={availability}
            price={price}
            isOnSale={isOnSale}
            discountedPrice={discountedPrice}
          />
          <SpaceDown>
            <AddToCartButton id={id} />
          </SpaceDown>
        </Col>
      </Row>
    </div>
  );
};

const SpaceDown = styled.div`
  margin-bottom: 1.5rem;
`;

const ResponsiveImage = styled.img`
  max-width: 100%;
`;

export default ProductDetails;
