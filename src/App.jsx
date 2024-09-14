import { PageNotFound } from "components/commons";
import Product from "components/Product/index";
import ProductList from "components/ProductList/index";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes";

import "./App.css";
// import CartItemsContext from "./contexts/CartItemsContext";

/*
Zustand and React context serve different purposes in managing
state in React applications. Zustand is a better option when
handling complex state updates with a focus on performance.
On the other hand, the React context API might be a better
choice for managing simple global states, such as themes or
current accounts. In some cases, we may even need to use them
together to handle states in our application.
*/

const App = () => (
  <Switch>
    <Route exact component={Product} path={routes.products.show} />
    <Route exact component={ProductList} path={routes.products.index} />
    <Redirect exact from={routes.root} to={routes.products.index} />
    <Route component={PageNotFound} path="*" />
  </Switch>
);

export default App;
