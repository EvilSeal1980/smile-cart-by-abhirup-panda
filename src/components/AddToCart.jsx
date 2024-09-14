import { Button } from "neetoui";

const AddToCart = ({ isInCart, toggleIsInCart }) => {
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
    toggleIsInCart();
  };

  return (
    <Button
      label={isInCart ? "Remove from cart" : "Add to cart"}
      size="large"
      onClick={handleClick}
    />
  );
};

export default AddToCart;
