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
    const order = useSelector(state => state.orders)[orderId];
    const [address, setAddress] = useState("");
    const [ orderItem, setOrderItem ] = useState({});
    const products = useSelector(state => state.products)
    useEffect(() => {
        async function hydrate() {
        await dispatch(loadSingleOrder(orderIdInt))
            .then(() => setOrderItem(order?.Orderitems))
            .then(() => setAddress(order?.address))
            .then(() => dispatch(loadAllProducts()))
            .then(() => setLoaded(true));
        }
        hydrate();
    }, [dispatch])

    const handleSubmit = async e => {
        e.preventDefault();
    }

    //the payload this time:
    /*
        address
        orderFor
        total
        Orderitems
    */

    //TODO: conditional rendering
    //only accessible when the current user is the buyer
    //TODO: HANDLE UPDATE AMOUNT
    return (
        loaded &&
        <div>
            <h1>Edit order</h1>
            <div>Order #{order.id}</div>
            <div>Items in your order</div>
            {console.dir(order)}
            {console.dir(orderItem)}
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
                            <input type="text" value={quantity}>
                            </input>
                        </div>
                    )
                    )
                }
                <div>Edit Address</div>
                    <input 
                        type="text"
                        value={address}
                        onChange={e=>setAddress(e.target.value)}>
                    </input>
                <button>Update order</button>
            </form>
            <button>Cancel order</button>
            <div>Subtotal</div>
            <div>$ {parseFloat(order.total).toFixed(2)}</div>
        </div>
    )
}

export default EditOrder;