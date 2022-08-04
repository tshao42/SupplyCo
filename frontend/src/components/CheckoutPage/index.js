import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import ShoppingCart from '../ShoppingCart';
import CartItemModuleCore from '../CartItemModuleCore/CoreItemModuleCore';
import { useHistory } from 'react-router-dom';
import { createOrder, loadAllUserOrders } from '../../store/order';
import { empty_entire_cart_function, load_cart_items_function } from '../../store/cart';




function CheckoutPage(){


    const stateArray = ["AK","AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];

    const history = useHistory();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart);
    const currentUserId = useSelector(state=>state.session.user.id)

    const [errors, setErrors] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");

    const reset = () =>{
        setFirstName("");
        setLastName("");
        setAddressLine1("");
        setAddressLine2("");
        setState("");
        setZipCode("");
        setCity("");
    }

    //criteria:
    //firstName.length > 0, only contains alphabetic
    //lastName.length > 0, only contains alphabetic
    //firstName + lastName=46 at most
    //addressLine1.length <46
    //addressLine2: none
    //state: dropdown; self-explanatory
    //zipCode: must be 5 digits integer
    //city: required; <50

    useEffect (()=>{
        let errors = [];
        //error criteria
        if (!firstName.length) errors.push("Please enter a valid first name!");
        if (!lastName.length) errors.push("Please enter a valid first name!");
        if (firstName.length + lastName.length > 46) errors.push("Name exceeding USPS limit; please shorten!");
        if (!addressLine1.length) errors.push("Please enter an address");
        if (!addressLine1.length && addressLine2.length) errors.push("Please enter Line 1 first!")
        if (addressLine1.length > 46) errors.push("Address exceeding USPS limit; please shorten!");
        if (!/^\d+$/.test(zipCode) || zipCode.length !== 5) errors.push("Please enter a valid five-digit zipcode!");
        if (!city.length) errors.push("Please enter a valid city!")
        setErrors(errors);
    }, [firstName, lastName, addressLine1, addressLine2, state, zipCode, city])

    const handleSubmit = async e => {
        e.preventDefault();
        const name=`${firstName} ${lastName}`;
        const address=`${addressLine1} ${addressLine2}, ${city}, ${state} ${zipCode}`
        const orderArr = Object.values(cartItems).slice(0,-1);
        const payload = {
            userId: currentUserId,
            address: address,
            orderFor: name,
            total: cartItems.total,
            Orderitems: orderArr
        }
        if (!errors.length){
            await dispatch(createOrder(payload))
            .then(()=>reset())
            .then(()=>loadAllUserOrders(currentUserId))
            .then(()=>dispatch(empty_entire_cart_function()))
            .then(()=>history.push(`/thankyou`));
        }
    }

    //the payload:
    /*
    userId
    address
    orderFor
    total
    Orderitems}
    */

    return(
        <div>
            <div>Order Summary</div>
            {cartItems.total !== 0
            ?
            <div>
                <form>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <label>
                        First Name
                        <input 
                        type="text" 
                        name="firstName" 
                        value = {firstName}
                        onChange = {e=>setFirstName(e.target.value)}
                        />
                    </label>
                    <label>
                        Last Name
                        <input 
                        type="text" 
                        name="lastName" 
                        value= {lastName}
                        onChange = {e=>setLastName(e.target.value)}
                        />
                    </label>
                    <label>
                        Address
                        <input 
                        type="text" 
                        name="addressLine1" 
                        value={addressLine1}
                        onChange = {e=>setAddressLine1(e.target.value)}
                        />
                    </label>
                    <label>
                        Address (cont.)
                        <input 
                        type="text" 
                        name="addressLine2"
                        value={addressLine2}
                        onChange = {e=>setAddressLine2(e.target.value)} 
                        />
                    </label>
                    <label>
                        State
                        <select 
                        onChange={e=>setState(e.target.value)}
                        value={state}
                        >
                            {stateArray.map(usState=>{
                            return<option value={usState}>{usState}</option>
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
                        onChange={e=>setZipCode(e.target.value)}
                        />
                    </label>
                    <label>
                        City
                        <input 
                        type="text" 
                        name="city"
                        value={city}
                        onChange={e=>setCity(e.target.value)} />
                    </label>
                </form>
                    <div>Your order</div>
                    <CartItemModuleCore />
                    <div>Subtotal</div>
                    <div>${parseFloat(cartItems.total).toFixed(2)}</div>
                    <div>We don't have a formal payment system yet because we'll send you Paypal Invoice for now; more payment features are coming soon!</div>
                    <button onClick={e=>handleSubmit(e)}>Submit Order</button>
            </div>
            :
            <div>
                <div>Oops, looks like you've got an empty cart...</div>
                <button
                    onClick={() => history.push('/products')}
                >
                    Browse More
                </button>
            </div>
            }
        </div>
    )
}

export default CheckoutPage;