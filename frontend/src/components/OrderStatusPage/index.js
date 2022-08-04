import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { loadSingleOrder } from '../../store/order';
import { loadAllProducts } from '../../store/product';

function OrderStatusPage(){

    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const { orderId } = useParams();
    const orderIdInt = parseInt(orderId);

    const order = useSelector(state=>state.orders)[orderId];
    const products = useSelector(state=>state.products)
    useEffect(()=>{
        async function hydrate(){
            await dispatch(loadSingleOrder(orderIdInt))
            .then(()=>dispatch(loadAllProducts()))
            .then(()=>setLoaded(true));
        }
        hydrate();
    }, [dispatch])

    return(
        loaded &&
        <div>
            <h1>Order detail</h1>
            <div>Order #{order.id}</div>
            <div>Items in your order</div>
            {
                order.Orderitems.map(({productId, quantity})=>(
                        <div key={productId}>
                            <div>
                                {products[productId].name}
                            </div>
                            <div>
                                $ {parseFloat(products[productId].price).toFixed(2)}
                            </div>
                            <div>
                                {quantity}
                            </div>
                        </div>
                    )
                )
            }
            <Link to={`/orders/${orderId}/edit`}>Edit order</Link>
            <button>Cancel order</button>
        </div>
    )
}

export default OrderStatusPage;