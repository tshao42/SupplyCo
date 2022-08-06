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

    const handleQuantityUpdate = async (e, id, newQuantity) => {
        e.preventDefault();
        console.log(`line 36 ${newQuantity}`)
        if (newQuantity.length>0){
            newQuantity = parseInt(newQuantity)
        }
        setQuantityChanges({ ...quantityChanges, [id]: { ["id"]: id, ["quantity"]: newQuantity} });
    }
    useEffect(()=>{
        console.log(`line 35`)
        setAddress(order?.address);
        setQuantityChanges((order?.Orderitems))
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
                    Object.values(order.Orderitems).map(({ id, productId }) => (
                        <div key={id}>
                            <div>
                                {products[productId].name}
                            </div>
                            <div>
                                $ {parseFloat(products[productId].price).toFixed(2)}
                            </div>
                            <input type="text" 
                                value={quantityChanges[id]?.quantity}
                                key={id}
                                onChange = {e=>{
                                   handleQuantityUpdate(e,id, e.target.value)
                                }}
                            >
                            {console.dir(quantityChanges)}
                            </input>
                        </div>
                    )
                    )
                }
                {/* {console.dir(itemsInOrder)} */}
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