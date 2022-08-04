import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllUserOrders } from '../../store/order';
import { Link } from 'react-router-dom';

function OrderSuccess() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const currentUserId = useSelector(state => state.session.user.id)
    useEffect(()=>{
        async function hydrate() {
            await dispatch(loadAllUserOrders(currentUserId))
            .then(()=>setLoaded(true))
        }
        hydrate();
    }, [dispatch]);
    const orders = useSelector(state=>state.orders);
    const latestOrderId = Object.values(orders).at(-1).id;
    return (
        loaded &&
        <div>
            <h1>Thank you for placing an order!</h1>
            <div>A invoice with details will be sent to your email address shortly</div>
            <Link to={`/orders/${latestOrderId}`}>View order</Link>
        </div>
    )
}

export default OrderSuccess;