import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllUserOrders } from '../../store/order';
import { Link } from 'react-router-dom';
import "./ordersuccess.css"
import NotFound from '../NotFound';

function OrderSuccess() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const currentUserId = useSelector(state => state.session.user?.id)
    useEffect(()=>{
        async function hydrate() {
            await dispatch(loadAllUserOrders(currentUserId))
            .then(()=>setLoaded(true))
        }
        hydrate();
    }, [dispatch]);
    const orders = useSelector(state=>state.orders);
    const latestOrderId = Object.values(orders).at(-1)?.id;
    return (
        loaded && latestOrderId && currentUserId
        ?<div id="order-success-container">
            <h1>Thank you for your order!</h1>
            <div>A invoice with details will be sent to your email address shortly</div>
            <br />
            <br />
            <Link to={`/orders/${latestOrderId}`} id="thank-you-page-redirect">View order</Link>
        </div>
        :<div>
            <NotFound />
        </div>
    )
}

export default OrderSuccess;