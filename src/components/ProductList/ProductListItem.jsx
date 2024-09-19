import { memo } from "react";

import AddToCart from "components/commons/AddToCart";
import { Typography } from "neetoui";
import { Link } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

const ProductListItem = ({ imageUrl, name, offerPrice, slug }) => (
  <Link
    className="neeto-ui-border-black neeto-ui-rounded-xl flex w-48 flex-col items-center justify-between border p-4"
    //to={`products/${slug}`}
    to={buildUrl(routes.products.show, { slug })}
  >
    <img alt={name} className="h-40 w-40" src={imageUrl} />
    <Typography className="text-center" weight="semibold">
      {name}
    </Typography>
    <Typography>${offerPrice}</Typography>
    {/* Since the prop and its value has the same name, we can use the spread
    syntax mentioned in this lesson to pass the slug prop. */}
    <AddToCart {...{ slug }} />
  </Link>
);

export default memo(ProductListItem);

/*
 * Memoization in React:
 *
 * - React.memo:
 *   - A higher-order component (HOC).
 *   - Prevents re-rendering of functional components if props remain the same.
 *   - Returns the cached result from memory.
 *
 * - useMemo:
 *   - A React hook.
 *   - Memoizes the result of a function/computation.
 *   - Re-runs only when dependencies in the dependency array change.
 *
 * - useCallback:
 *   - A React hook.
 *   - Memoizes a callback function.
 *   - Re-runs only when dependencies in the dependency array change.
 */
