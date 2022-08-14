import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { deleteOrder, editOrder, loadAllUserOrders, loadSingleOrder } from '../../store/order';
import { loadAllProducts } from '../../store/product';
import NotFound from '../NotFound';
import "./editorder.css"

function EditOrder(){
    const dispatch = useDispatch();
    const history = useHistory();
    const [loaded, setLoaded] = useState(false);
    const { orderId } = useParams();
    const orderIdInt = parseInt(orderId);

    //useSelector for orderId
    const order = useSelector(state => state.orders)[orderId];
    const currentUserId = useSelector(state => state.session.user?.id);

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
        let errors = [];
        if (!addressLine1.length) errors.push("Please enter an address");
        if (!addressLine1.length && addressLine2.length) errors.push("Please enter Line 1 first!")
        if (addressLine1.length > 46) errors.push("Address exceeding USPS limit; please shorten to less than 46 characters!");
        if (!/^\d+$/.test(zipCode) || zipCode.length !== 5) errors.push("Please enter a valid five-digit zipcode!");
        if (city.length>20) errors.push("City name is too long; please shorten it to less than 20 characters");
        if (!city.length) errors.push("Please enter a valid city!");
        setErrors(errors);

        if (!errors.length){
            await dispatch(editOrder(orderId, payload))
            .then(()=>history.push(`/orders/${orderId}`));
        }

    }

    const handleDelete = async e => {
        e.preventDefault();
        await dispatch(deleteOrder(orderId))
        .then(()=>history.push(`/myorders`))
    }

    const stateArray = ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];

    const handleQuantityUpdate = async (e, id, newQuantity, productId) => {
        e.preventDefault();
        if (newQuantity.length > 0 && "0123456789".includes(newQuantity[0]))
            newQuantity = parseFloat(newQuantity);
        if(newQuantity<0) newQuantity=0;
        if ((newQuantity.length > 0 && !"0123456789".includes(newQuantity[0]))) {
            newQuantity= 1;
        }
        const prevState = quantityChanges;
        
        setQuantityChanges({ ...quantityChanges, [id]: {
             ...quantityChanges[id], 
             ["quantity"]: newQuantity
        } }); 
        
    }
    
    
    useEffect(()=>{
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
        loaded && order && currentUserId===order?.userId
        ?<div id="edit-order-container">
            <h1>Edit order</h1>
            <div id="edit-order-id">Order #{order.id}</div>
            <div>Items in your order</div>
            {/* {console.dir(order)}
            {console.dir(orderItem)} */}
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <form onSubmit={handleSubmit}>
                {
                    Object.values(order.Orderitems).map(({ id, productId }) => (
                        <div key={id} id="order-edit-line-container">
                            <Link to={`/products/${productId}`} id="item-link">
                                {products[productId].name}
                            </Link>
                            <div id="price-now">
                                ${parseFloat(products[productId].price).toFixed(2)}
                            </div>
                            <input type="number" 
                            id="order-edit-number-field"
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
                <div id="address-edit-container">
                <div id="edit-address-title">Edit address</div>
                    <label>
                        Address:*
                        <input
                            id="order-input-field-address-line"
                            className="input-field-universal"
                            type="text"
                            name="addressLine1"
                            value={addressLine1}
                            onChange={e => setAddressLine1(e.target.value)}
                        />
                    </label>
                    <label>
                        Address (cont.):
                        <input
                            id="order-input-field-address-line-two"
                            className="input-field-universal"
                            type="text"
                            name="addressLine2"
                            value={addressLine2}
                            onChange={e => setAddressLine2(e.target.value)}
                        />
                    </label>
                    <label>
                        City:*
                        <input
                            className="input-field-universal"
                            id="order-input-field-city"
                            type="text"
                            name="city"
                            value={city}
                            onChange={e => setCity(e.target.value)} />
                    </label>
                    <label>
                        State:*
                        <select
                            className="order-input-select-menu"
                            id="order-input-select-menu-container"
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
                        Zip Cide:*
                        <input
                            className="input-field-universal"
                            id="order-input-field-zipcode"
                            type="text"
                            name="zipCode"
                            value={zipCode}
                            onChange={e => setZipCode(e.target.value)}
                        />
                    </label>
                    </div>
                    <br />
                    <div id="required-message">*Required field</div>
                    <br />
                <button className="order-edit-page-button" type="submit" id="order-edit-update">Update order</button>
            </form>
            <button className="order-edit-page-button" onClick={handleDelete}>Cancel order</button>
        </div>
        :
        <div>
            <NotFound />
        </div>
    )
}

export default EditOrder;