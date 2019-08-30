import React from "react";
import { List } from "antd";
import { A } from "hookrouter";
import { useStoreState } from "easy-peasy";
import { Helmet } from "react-helmet";

import CatalogueItem from "./Card";

export const Catalogue = () => {
  const items = useStoreState(state => state.products.products);

  return (
    <>
      <Helmet>
        <title>MyBrand - Catalogue</title>
      </Helmet>
      <List
        grid={{
          gutter: 16,
          md: 2,
          lg: 2,
          xl: 4,
          xxl: 4
        }}
        dataSource={items}
        renderItem={item => (
          <List.Item>
            <A href={`/products/${item.id}`}>
              <CatalogueItem
                id={item.id}
                name={item.name}
                thumbnail={item.image}
                thumbnailFlipped={item.image_flip}
                price={
                  item.discountedPrice
                    ? `${item.discountedPrice} €`
                    : `${item.price} €`
                }
              />
            </A>
          </List.Item>
        )}
      />
    </>
  );
};
