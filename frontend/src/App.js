import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { loadAllProducts } from "./store/product";
import { loadAllUserOrders } from "./store/order";
import CheckoutPage from "./components/CheckoutPage";
import ProductsPage from "./components/ProductsPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  // testing area
  // const products = useSelector(state=>state.products)
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    // testing area
    // dispatch(loadAllProducts());
    // dispatch(loadAllUserOrders(1));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
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
        </Switch>
      )}
    </>
  );
}

export default App;
