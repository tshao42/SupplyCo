import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
// import { loadAllProducts } from "./store/product";
// import { loadAllUserOrders } from "./store/order";
import CheckoutPage from "./components/CheckoutPage";
import ProductsPage from "./components/ProductsPage";
import SingleProductPage from "./components/SingleProductPage";
import { load_cart_items_function } from "./store/cart";
import ShoppingCart from "./components/ShoppingCart";
import { getKey } from "./store/map";
import HomePage from "./components/Home";
import OrderStatusPage from "./components/OrderStatusPage";
import OrderSuccess from "./components/OrderSuccess";
import EditOrder from "./components/EditOrder";
import MyOrders from "./components/MyOrders";
import { loadAllUserOrders } from "./store/order";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);


  // testing area
  const currentUser = useSelector(state=>state.session.user);
  // const products = useSelector(state=>state.products)
  useEffect(() => {
    async function hydrate(){
      await dispatch(sessionActions.restoreUser())
        .then(() => dispatch(load_cart_items_function()))
        .then(() => dispatch(loadAllUserOrders(currentUser?.id)))
        .then(() => setIsLoaded(true))
    }
    hydrate();
    // dispatch(getKey());
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/checkout">
            <CheckoutPage />
          </Route>
          <Route exact path="/products">
            <ProductsPage />
          </Route>
          <Route expact path="/products/:productId">
            <SingleProductPage />
          </Route>
          <Route exact path="/cart">
            <ShoppingCart />
          </Route>
          <Route exact path="/orders/:orderId">
            <OrderStatusPage />
          </Route>
          <Route exact path="/thankyou">
            <OrderSuccess />
          </Route>
          <Route exact path='/orders/:orderId/edit' >
            <EditOrder />
          </Route>
          <Route exact path='/myorders'>
            <MyOrders />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
