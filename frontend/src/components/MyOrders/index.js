import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loadAllUserOrders } from '../../store/order';
import { loadAllProducts } from '../../store/product';
import dayjs from 'dayjs';
import "./myorders.css"


function MyOrders(){

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const currentUserId = currentUser?.id;
    const orders = useSelector(state=>state.orders);
    const products = useSelector(state => state.products);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        async function hydrate() {
            await dispatch(loadAllProducts())
            .then(() => {if(currentUserId){
                dispatch(loadAllUserOrders(currentUserId))
            }})
            .then(() => setLoaded(true));
        }
        hydrate();
    }, [dispatch])

    return(
        loaded&&
        <>
        {currentUserId!==undefined
            ?<div id="past-orders-container">
                <h1>Past Orders</h1>
                {Object.values(orders).length > 0
                   ? <div id="orders-container">
                    {
                        Object.values(orders).map(({id, total, createdAt})=>(
                            <div className="past-order-line">
                                <div id="past-order-number"> Order#{id} </div>
                                <div id="past-order-date"> Placed on: {dayjs(createdAt).format('MM/DD/YYYY')} </div>
                                <div id="past-order-total"> Total: ${parseFloat(total).toFixed(2)}</div>
                                <Link id="past-order-details" to={`/orders/${id}`}>Details</Link>
                            </div>
                        ))
                    }
                    </div>
                    :   <div>
                            <div>You have not placed any order!</div>
                            <Link to={`/products`}>{`<`}Shop now</Link>
                        </div>
                }
             </div>
            : <div>
                <Redirect to={`/login`} />
            </div>
        }
        </>
    )
}

export default MyOrders;