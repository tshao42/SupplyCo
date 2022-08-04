import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { delete_cart_itemfunction, load_cart_items_function, update_quantity_function } from '../../store/cart';
import { loadAllProducts } from '../../store/product'
import { Link } from 'react-router-dom'

function CartItemModuleCore() {

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart);
    const products = useSelector(state => state.products);
    const [loaded, setLoaded] = useState(false);
    const [initialQuantity, setInitialQuantity] = useState();
    const [quantityError, setQuantityError] = useState([]);
    useEffect(() => {
        async function hydrate() {
            await dispatch(loadAllProducts())
                .then(() => setInitialQuantity(cartItems))
                .then(() => setLoaded(true))
        }
        hydrate();
    }, [dispatch])


    const handleItemEdit = async (e, productId, quantity) => {
        e.preventDefault();
        let temp = initialQuantity[productId].quantity;
        const dprice = (quantity - temp) * parseInt(products[productId].price);
        if (parseInt(quantity) === 0) {
            await dispatch(delete_cart_itemfunction(productId, dprice))
                .then(() => dispatch(load_cart_items_function()));
        } else {
            await dispatch(update_quantity_function(productId, quantity, dprice))
                .then(() => dispatch(load_cart_items_function()));
        }
    }

    const handleSimplePlusMinus = async (e, productId, quantity) => {
        e.preventDefault();
        if (quantity >= 1) {
            let temp = initialQuantity[productId].quantity;
            const dprice = (quantity - temp) * parseInt(products[productId].price);
            await dispatch(update_quantity_function(productId, quantity, dprice))
                .then(() => dispatch(load_cart_items_function()));
        } else {
            dispatch(update_quantity_function(productId, 1, 0));
        }
    }


    return (
        loaded &&
        <div>
            {Object.values(cartItems).slice(0, -1).map(({ productId, quantity }) => {
                return (
                    <div key={productId}>
                        <form>
                        <button onClick={e => handleItemEdit(e, productId, 0)}>×</button>
                        <div>productId: {productId}</div>
                        <div>{products[productId].name}</div>
                        <div>$ {parseFloat(products[productId].price).toFixed(2)}</div>
                        <button onClick={e => handleSimplePlusMinus(e, productId, quantity -= 1)}>
                            -
                        </button>
                            <input
                                type='text'
                                name='quantity'
                                value={quantity}
                                onChange={e => handleItemEdit(e, productId, e.target.value)}>
                            </input>
                        <button onClick={e => handleSimplePlusMinus(e, productId, quantity += 1)}>
                            +
                        </button>
                        </form>
                    </div>
                )
            })}
        </div>
    )
}

export default CartItemModuleCore;