import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { loadSingleOrder } from '../../store/order';
import { loadAllProducts } from '../../store/product';

function EditOrder(){
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const { orderId } = useParams();
    const orderIdInt = parseInt(orderId);
    const [initialQuantity, setInitialQuantity] = useState();

    const order = useSelector(state => state.orders)[orderId];
    const products = useSelector(state => state.products)
    useEffect(() => {
        async function hydrate() {
        await dispatch(loadSingleOrder(orderIdInt))
            .then(() => setInitialQuantity(order))
            .then(() => dispatch(loadAllProducts()))
            .then(() => setLoaded(true));
        }
        hydrate();
    }, [dispatch])

    return (
        loaded &&
        <div>
            <h1>Edit order</h1>
            <div>Order #{order.id}</div>
            <div>Items in your order</div>
            <form>
                {
                    order.Orderitems.map(({ productId, quantity }) => (
                        <div key={productId}>
                            <div>
                                {products[productId].name}
                            </div>
                            <div>
                                $ {parseFloat(products[productId].price).toFixed(2)}
                            </div>
                            <input type="text">
                            </input>
                        </div>
                    )
                    )
                }
                <button>Update order</button>
            </form>
            <button>Cancel order</button>
            <div>Subtotal</div>
            <div>$ {parseFloat(order.total).toFixed(2)}</div>
        </div>
    )
}

export default EditOrder;