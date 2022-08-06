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

    //useSelector for orderId
    const order = useSelector(state => state.orders)[orderId];

    //the useState
    const [address, setAddress] = useState(order?.address);
    const [ quantityChanges, setQuantityChanges ] = useState({});
    const products = useSelector(state => state.products); 
    useEffect(() => {
        async function hydrate() {
        await dispatch(loadSingleOrder(orderIdInt))
            .then(() => dispatch(loadAllProducts()))
            .then(() => setLoaded(true));
        }
        hydrate();
    }, [dispatch])

    //need to get this done
    const handleSubmit = async e => {
        e.preventDefault();
    }

    useEffect(()=>{
        console.log(`line 35`)
        setAddress(order?.address);
    }, [order])

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
        loaded && order &&
        <div>
            {/* {console.dir(Orderitems)} */}
            <h1>Edit order</h1>
            <div>Order #{order.id}</div>
            <div>Items in your order</div>
            {/* {console.dir(order)}
            {console.dir(orderItem)} */}
            <form>
                {
                    Object.values(order.Orderitems).map(({ id, productId, quantity }) => (
                        <div key={id}>
                            <div>
                                {products[productId].name}
                            </div>
                            <div>
                                $ {parseFloat(products[productId].price).toFixed(2)}
                            </div>
                            <input type="text" 
                                value={quantity} 
                                key={id}
                                onChange = {e=>{
                                    e.preventDefault;
                                    setQuantityChanges({...quantityChanges, [id]: {["id"]: id, ["quantity"]: e.target.value}});
                                }}
                            >
                            </input>
                        </div>
                    )
                    )
                }
                {console.dir(itemsInOrder)}
                <div>Edit address</div>
                <input type="text"
                    value={address}
                    onChange={e=>{
                        e.preventDefault();
                        setAddress(e.target.value)
                    }}
                ></input>
                <button>Update order</button>
            </form>
            <button>Cancel order</button>
            <div>Subtotal</div>
            <div>$ {parseFloat(order.total).toFixed(2)}</div>
        </div>
    )
}

export default EditOrder;