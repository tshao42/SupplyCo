import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import ShoppingCart from '../ShoppingCart';
import CartItemModuleCore from '../CartItemModuleCore/index';
import { Redirect, useHistory } from 'react-router-dom';
import { createOrder, loadAllUserOrders } from '../../store/order';
import { empty_entire_cart_function, load_cart_items_function } from '../../store/cart';
import "./checkout.css"
import { loadAllProductsImages } from '../../store/productimage';




function CheckoutPage(){


    const stateArray = ["AK","AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];

    const history = useHistory();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart);
    const images = useSelector(state=>state.productImages)
    const currentUserId = useSelector(state=>state.session.user?.id)

    const [errors, setErrors] = useState([]);
    const [mainLoaded, setMainLoaded] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");

    useEffect(()=>{
        async function hydrate(){
            await dispatch(loadAllProductsImages())
            .then(()=>setMainLoaded(true));
        }
        hydrate();
    }, [dispatch])



    const reset = () =>{
        setFirstName("");
        setLastName("");
        setAddressLine1("");
        setAddressLine2("");
        setState("");
        setZipCode("");
        setCity("");
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const name=`${firstName} ${lastName}`;
        const orderArr = Object.values(cartItems).slice(0,-1);
        const payload = {
            userId: currentUserId,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            state: state,
            zipCode: zipCode,
            orderFor: name,
            total: cartItems.total,
            Orderitems: orderArr
        }

        let errors = [];
        //error criteria
        if (!firstName.length) errors.push("Please enter a valid first name! (cannot be empty)");
        if (!lastName.length) errors.push("Please enter a valid last name! (cannot be empty)");
        if (firstName.length + lastName.length > 46) errors.push("Name is too long, please shorten(keep the sum of fist name and last name lengths under 46 characters please");
        if (!addressLine1.length) errors.push("Please enter an address");
        if (!addressLine1.length && addressLine2.length) errors.push("Please enter Line 1 first!")
        if (addressLine1.length > 46) errors.push("Address exceeding USPS limit; please shorten to less than 46 characters!");
        if (addressLine2.length > 46) errors.push("Address exceeding USPS limit; please shorten to less than 46 characters!");
        if (!/^\d+$/.test(zipCode) || zipCode.length !== 5) errors.push("Please enter a valid five-digit zipcode!");
        if (!city.length) errors.push("Please enter a valid city!")
        if (city.length > 20) errors.push("City name is too long; please shorten it to less than 20 characters");
        setErrors(errors);


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
        <div className="checkout-summary-container">
            {currentUserId &&
            <div>
                {cartItems.total > 1
                ?
                <div>
                    <div id="checkout-summary-container">
                        <form>
                            <ul>
                                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                            </ul>
                            <div id="form-header">Shipping Information</div>
                            <div id="checkout-page-line-one">
                                <span id="checkout-page-first-name">
                                    <label>
                                        First Name:* 
                                        <input 
                                        className="input-field-universal"
                                        id="input-field-first-name"
                                        type="text" 
                                        name="firstName" 
                                        value = {firstName}
                                        onChange = {e=>setFirstName(e.target.value)}
                                        />
                                    </label>
                                </span>
                                <span id="checkout-page-last-name">
                                    <label>
                                        Last Name:*
                                        <input 
                                        className = "input-field-universal"
                                        id="input-field-last-name"
                                        type="text" 
                                        name="lastName" 
                                        value= {lastName}
                                        onChange = {e=>setLastName(e.target.value)}
                                        />
                                    </label>
                                </span>
                            </div>
                            <div id="checkout-page-line-two">
                                <label>
                                    Address:*
                                    <input 
                                    id="input-field-address-line-one"
                                    className="input-field-universal"
                                    type="text" 
                                    name="addressLine1" 
                                    value={addressLine1}
                                    onChange = {e=>setAddressLine1(e.target.value)}
                                    />
                                </label>
                                <label>
                                    Address (cont.):
                                    <input 
                                    id="input-field-address-line-two"
                                    className="input-field-universal"
                                    type="text" 
                                    name="addressLine2"
                                    value={addressLine2}
                                    onChange = {e=>setAddressLine2(e.target.value)} 
                                    />
                                </label>
                            </div>
                            <div id="checkout-page-line-three">
                                <label>
                                    City:*
                                    <input
                                    className="input-field-universal"
                                    id="input-field-city"
                                        type="text"
                                        name="city"
                                        value={city}
                                        onChange={e => setCity(e.target.value)} />
                                </label>
                                <label>
                                    State:*
                                    <select 
                                    className="input-select-menu"
                                    id="input-select-menu-container"
                                    onChange={e=>setState(e.target.value)}
                                    value={state}
                                    >
                                        {stateArray.map(usState=>{
                                        return<option 
                                        value={usState}
                                        className="input-select-menu"
                                        >{usState}</option>
                                        }
                                        )}
                                    </select>
                                </label>
                                <label>
                                    Zip Code:*
                                    <input 
                                    className="input-field-universal"
                                    id="input-field-zipcode"
                                    type="text" 
                                    name="zipCode"
                                    value={zipCode}
                                    onChange={e=>setZipCode(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div id="required-message">* Required fields</div>
                        </form>
                    </div>
                        <div id="your-order">Your order</div>
                        <div id="cart-item-preview">
                            <CartItemModuleCore mainLoaded={mainLoaded} images={images}/>
                        </div>
                        <div id="subtotal-display">Subtotal: ${parseFloat(cartItems.total).toFixed(2)}</div>
                        <button id="checkout-submit-button" onClick={e=>handleSubmit(e)}>Submit Order</button>
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
            }
            {!currentUserId &&
                <Redirect to="/login" />
            }
        </div>
    )
}

export default CheckoutPage;