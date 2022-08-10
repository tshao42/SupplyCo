import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { delete_cart_itemfunction, load_cart_items_function, update_quantity_function } from '../../store/cart';
import { loadAllProducts } from '../../store/product'
import { Link, useHistory } from 'react-router-dom'
import CartItemModuleCore from '../CartItemModuleCore/index';
import { loadAllProductsImages } from '../../store/productimage';
import "./shoppingcart.css"

function ShoppingCart() {
    const history = useHistory();
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart);
    const images = useSelector(state=>state.productImages)
    const [mainLoaded, setMainLoaded] = useState(false);
    useEffect(()=>{
        async function hydrate(){
         await dispatch(loadAllProductsImages())
         .then(()=>setMainLoaded(true))
        }
        hydrate();
    }, [dispatch])
    return (
        <div className="shopping-cart-container">
            <h1 id="shopping-cart-title">Items in cart</h1>
            <CartItemModuleCore images={images} mainLoaded={mainLoaded} />
            <div id="shopping-cart-subtotal">
                <div>
                    Subtotal
                </div>
                    <div>
                    <div id="shopping-cart-subtotal-amount">${parseFloat(cartItems.total).toFixed(2)}</div>
                    {cartItems.total !== 0 &&
                        <button onClick={e => {
                            e.preventDefault();
                            history.push(`/checkout`)
                        }}
                            id="shopping-cart-checkout">Checkout</button>
                    }
                </div>
            </div>
        <div>
            {cartItems.total===0 &&
                    <div>
                        <div>Your cart is empty...</div>
                        <Link to='/products'>Browse our offerings</Link>
                    </div>
            }
            </div>
        </div>
    )
}

export default ShoppingCart;