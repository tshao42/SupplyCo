import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { delete_cart_itemfunction, load_cart_items_function, update_quantity_function } from '../../store/cart';
import { loadAllProducts } from '../../store/product'
import { Link } from 'react-router-dom'
import CartItemModuleCore from '../CartItemModuleCore/CoreItemModuleCore';

function ShoppingCart() {
    const cartItems = useSelector(state => state.cart);

    return (
        <div>
            <h1>Items in cart:</h1>
            <CartItemModuleCore />
            <div>
                Subtotal
            </div>
            <div>${parseFloat(cartItems.total).toFixed(2)}</div>
        <div>
            {cartItems.total===0 &&
                    <div>
                        <div>Your cart is empty...</div>
                        <Link to='/products'>Browse our offerings</Link>
                    </div>
            }
            </div>
            {cartItems.total!==0 &&
                <Link to='/checkout'>Checkout</Link>
            }
        </div>
    )
}

export default ShoppingCart;