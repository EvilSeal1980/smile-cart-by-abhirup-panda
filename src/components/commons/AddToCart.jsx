/* eslint-disable prettier/prettier */
import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import { Button } from "neetoui";
import { isNil } from "ramda";
import { useTranslation } from "react-i18next";

import ProductQuantity from "./ProductQuantity";

/*
However, there is one issue with the above implementation.
Since the value returned by the selector function is an
object generated from the store value, its reference will
be different each time the selector function is invoked.
As a result, the component will get re-rendered even if the
values of isInCart and toggleIsInCart remain the same.

To address this issue, the Zustand store hook also accepts
a comparator function, allowing you to specify how to compare
the retrieved value from the store. Zustand provides a shallow
comparator function, which performs a shallow comparison of
the properties or elements of the object or array generated
using the selector function.
*/

const AddToCart = ({ slug }) => {
  const { t } = useTranslation();
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  /*
  Since the AddToCart button comes inside the <Link> component,
  clicking the button would take us to the product page. To
  avoid this, we can prevent the default navigation behaviour
  of the button and stop the click event from propagating to
  the <Link> component, by using preventDefault and
  stopPropagation methods on the event object.
  */

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedQuantity(1);
  };

  // return (
  //   <Button
  //     label={isInCart ? "Remove from cart" : "Add to cart"}
  //     size="large"
  //     onClick={handleClick}
  //   />
  // );

  if (isNil(selectedQuantity)) {
    return <Button label={t("addToCart")} size="large" onClick={handleClick} />;
  }

  return <ProductQuantity {...{ slug }} />;
};

export default AddToCart;
