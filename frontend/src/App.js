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
import About from "./components/About"
import Footer from "./components/Footer"
import { loadAllUserOrders } from "./store/order";
import NotFound from "./components/NotFound";
import CollectionInfo from "./components/CollectionInfo";
import MyCollections from "./components/MyCollections";
import ProductManagement from "./components/ProductManagement";
import OrderManagement from "./components/OrderManagement";
import StorefrontStatistics from "./components/StorefrontStatistics";

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
        // .then(() => dispatch(loadAllUserOrders(currentUser?.id)))
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
          <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/mycollections'>
            <MyCollections />
          </Route>
          <Route exact path='/mycollections/:collectionId'>
            <CollectionInfo />
          </Route>
          <Route exact path='/management/products'>
            <ProductManagement />
          </Route>
          <Route exact path='/management/orders'>
            <OrderManagement />
          </Route>
          <Route exact path='/management/statistics'>
            <StorefrontStatistics />
          </Route>
          <Route default>
            <NotFound />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
