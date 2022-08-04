import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllUserOrders } from '../../store/order';
import { loadAllProducts } from '../../store/product';


function MyOrders(){

    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.session.user.id)
    const orders = useSelector(state=>state.orders);
    const products = useSelector(state => state.products);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        async function hydrate() {
            await dispatch(loadAllProducts())
            .then(() => dispatch(loadAllUserOrders(currentUserId)))
            .then(() => setLoaded(true));
        }
        hydrate();
    }, [dispatch])

    return(
        loaded&&
        <div>
            <h1>hello from myorders</h1>
        </div>
    )
}

export default MyOrders;