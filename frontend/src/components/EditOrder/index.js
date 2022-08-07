import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { editOrder, loadAllUserOrders, loadSingleOrder } from '../../store/order';
import { loadAllProducts } from '../../store/product';

function EditOrder(){
    const dispatch = useDispatch();
    const history = useHistory();
    const [loaded, setLoaded] = useState(false);
    const { orderId } = useParams();
    const orderIdInt = parseInt(orderId);

    //useSelector for orderId
    const order = useSelector(state => state.orders)[orderId];

    //the useState
    const [errors, setErrors] = useState([]);
    const [addressLine1, setAddressLine1] = useState(order?.addressLine1);
    const [addressLine2, setAddressLine2] = useState(order?.addressLine2);
    const [city, setCity] = useState(order?.city);
    const [state, setState] = useState(order?.state);
    const [zipCode, setZipCode] = useState(order?.zipCode);
    const [quantityChanges, setQuantityChanges ] = useState({});
    const products = useSelector(state => state.products); 
    // const [totalPrice, setTotalPrice] = useState(order?.total);
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

        let totalPrice = 0;
        for (const item in quantityChanges){
            const productId = quantityChanges[item].productId;
            const newQuantity = quantityChanges[item].quantity;
            const product = products[productId]
            const itemPrice = parseFloat(product.price);
            totalPrice += newQuantity * itemPrice;
        }

        const payload = {
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            state: state,
            zipCode: zipCode,
            total: parseFloat(totalPrice),
            Orderitems: quantityChanges
        }

        console.log(`line 51`)
        console.dir(payload);
        console.log(typeof payload);
        console.log (Array.isArray(payload));
        if (!errors.length){
            await dispatch(editOrder(orderId, payload))
            .then(()=>console.log(`line 55 edit dispatched`))
            .then(()=>history.push(`/orders/${orderId}`))
            .then(()=>console.log(`history.push dispatched`))
        }

    }


    const stateArray = ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];
    useEffect(() => {
        if (order){
            let errors = [];
            if (!addressLine1.length) errors.push("Please enter an address");
            if (!addressLine1.length && addressLine2.length) errors.push("Please enter Line 1 first!")
            if (addressLine1.length > 46) errors.push("Address exceeding USPS limit; please shorten!");
            if (!/^\d+$/.test(zipCode) || zipCode.length !== 5) errors.push("Please enter a valid five-digit zipcode!");
            if (!city.length) errors.push("Please enter a valid city!");
            setErrors(errors);
        }
    }, [addressLine1, addressLine2, state, zipCode, city])

    const handleQuantityUpdate = async (e, id, newQuantity, productId) => {
        e.preventDefault();
        if (newQuantity.length > 0 && "0123456789".includes(newQuantity[0]))
            newQuantity = parseInt(newQuantity);
        if ((newQuantity.length > 0 && !"0123456789".includes(newQuantity[0]))) {
            newQuantity= 1;
            alert('Please only enter numbers!');
        }

        const prevState = quantityChanges;

        // console.log(`line 82 ${totalPrice}`)
        setQuantityChanges({ ...quantityChanges, [id]: {
             ...quantityChanges[id], 
             ["quantity"]: newQuantity
        } }); 
        
    }
    
    
    useEffect(()=>{
        console.log(`triggered line 88`)
        setAddressLine1(order?.addressLine1);
        setAddressLine2(order?.addressLine2);
        setCity(order?.city);
        setState(order?.state);
        setZipCode(order?.zipCode);
        setQuantityChanges((order?.Orderitems));
        // setTotalPrice(order?.total);
    }, [order])


    //TODO: conditional rendering
    //only accessible when the current user is the buyer
    //TODO: HANDLE UPDATE AMOUNT
    return (
        loaded && order && 
        <div>
            {/* {console.dir(Orderitems)} */}
            {/* {console.dir(quantityChanges)} */}

            <h1>Edit order</h1>
            <div>Order #{order.id}</div>
            <div>Items in your order</div>
            {/* {console.dir(order)}
            {console.dir(orderItem)} */}
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <form onSubmit={handleSubmit}>
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
                                   handleQuantityUpdate(e,id, e.target.value, productId)
                                }}
                            >
                            </input>
                        </div>
                    )
                    )
                }
                {/* {console.dir(itemsInOrder)} */}
                <div>Edit address</div>
                    <label>
                        Address
                        <input
                            type="text"
                            name="addressLine1"
                            value={addressLine1}
                            onChange={e => setAddressLine1(e.target.value)}
                        />
                    </label>
                    <label>
                        Address (cont.)
                        <input
                            type="text"
                            name="addressLine2"
                            value={addressLine2}
                            onChange={e => setAddressLine2(e.target.value)}
                        />
                    </label>
                    <label>
                        City
                        <input
                            type="text"
                            name="city"
                            value={city}
                            onChange={e => setCity(e.target.value)} />
                    </label>
                    <label>
                        State
                        <select
                            onChange={e => setState(e.target.value)}
                            value={state}
                        >
                            {stateArray.map(usState => {
                                return <option value={usState}>{usState}</option>
                            }
                            )}
                        </select>
                    </label>
                    <label>
                        Zip or Postal Code
                        <input
                            type="text"
                            name="zipCode"
                            value={zipCode}
                            onChange={e => setZipCode(e.target.value)}
                        />
                    </label>
                <button type="submit">Update order</button>
            </form>
            <button>Cancel order</button>
            <div>Subtotal</div>
            <div>$ {parseFloat(order.total).toFixed(2)}</div>
        </div>
    )
}

export default EditOrder;