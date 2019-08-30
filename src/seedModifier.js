import { mocks } from "./seed";
import { discount } from "./utils";

mocks.forEach(element => {
  if (element.isOnSale) {
    element.discountedPrice = discount(element.price);
  }
  element.copies = 1;
});

export { mocks };
