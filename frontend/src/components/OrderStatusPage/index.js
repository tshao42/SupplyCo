import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { deleteOrder, loadSingleOrder } from '../../store/order';
import { loadAllProducts } from '../../store/product';
import { loadAllProductsImages } from '../../store/productimage';
import NotFound from '../NotFound';
import "./orderstatus.css"

function OrderStatusPage(){
//TODO: state shape changed from array to Object
//need to change the .map
    const dispatch = useDispatch();
    const history = useHistory();
    const [loaded, setLoaded] = useState(false);
    const { orderId } = useParams();
    const orderIdInt = parseInt(orderId);
    const images = useSelector(state=>state.productImages);

    const order = useSelector(state=>state.orders)[orderId];
    const currentUserId = useSelector(state => state.session.user?.id)

    const products = useSelector(state=>state.products)
    const entireAddress = function (address1, address2){
        if (address2) return `${address1}, ${address2}`

    }
    useEffect(()=>{
        async function hydrate(){
            await dispatch(loadSingleOrder(orderIdInt))
            .then(()=>dispatch(loadAllProductsImages()))
            .then(()=>dispatch(loadAllProducts()))
            .then(()=>setLoaded(true));
        }
        hydrate();
    }, [dispatch])


    const handleDelete = async e => {
        e.preventDefault();
        await dispatch(deleteOrder(orderId))
            .then(() => history.push(`/myorders`))
    }

    return(
        loaded 
        ?<div id="order-details-basic-container">
            {order?.userId===currentUserId
                ?<div>
                    <h1>Order detail</h1>
                    <div>Order #{order.id}</div>
                    <div>Shipping Information:</div>
                    <div>{`${order.orderFor}`}</div>
                    <div>{`${order.addressLine1}`}</div>
                    <div>{`${order?.addressLine2}`}</div>
                    <div>{`${order.city}, ${order.state} ${order.zipCode}`}</div>
                    <div id="order-detail-title">Items in your order:</div>
                    <div id="items-container">
                        {
                            Object.values(order.Orderitems).map(({productId, quantity})=>(
                                    <div key={productId} className="items-per-line">
                                        <div id="item-image">
                                            {Object.values(images[productId]).length !== 0 &&
                                                <img src={Object.values(images[productId])[0].siteUrl} className="cart-thumbnail" />
                                            }
                                        </div>
                                        <Link to={`/products/${productId}`} id="order-detail-link">
                                            {products[productId].name}
                                        </Link>
                                        <div id="order-detail-single-item-price">
                                            ${parseFloat(products[productId].price).toFixed(2)}
                                        </div>
                                        <div id="order-detail-quantity">
                                            x{quantity}
                                        </div>
                                        <div id="order-quantity-price-total">
                                            ${parseFloat(products[productId].price * quantity).toFixed(2)}
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </div>
                    <div id="subtotal">
                    <div>Subtotal: ${parseFloat(order.total).toFixed(2)}</div>
                    <div id="edit-order-order-detail">
                        <Link to={`/orders/${orderId}/edit`}>Edit order</Link>
                    </div>
                    <div id="cancel-order">
                        <div onClick={e=>handleDelete(e)}>Cancel order</div>
                    </div>
                    </div>
                </div>
                :
                <div>
                    <NotFound />
                </div>
            }
        </div>
        :
        <div>
            <NotFound />
        </div>
    )
}

export default OrderStatusPage;