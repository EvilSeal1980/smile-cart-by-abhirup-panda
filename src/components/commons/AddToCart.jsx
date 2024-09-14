import { useContext } from "react";

import { Button } from "neetoui";
import { without } from "ramda";
import CartItemsContext from "src/contexts/CartItemsContext";

const AddToCart = ({ slug }) => {
  const [cartItems, setCartItems] = useContext(CartItemsContext);
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
    setCartItems(prevCartItems =>
      prevCartItems.includes(slug)
        ? without([slug], cartItems)
        : [slug, ...cartItems]
    );
  };

  return (
    <Button
      label={cartItems.includes(slug) ? "Remove from cart" : "Add to cart"}
      size="large"
      onClick={handleClick}
    />
  );
};

export default AddToCart;
