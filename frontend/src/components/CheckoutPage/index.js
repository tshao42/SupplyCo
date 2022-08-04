import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import ShoppingCart from '../ShoppingCart';
import CartItemModuleCore from '../CartItemModuleCore/CoreItemModuleCore';
import { useHistory } from 'react-router-dom';




function CheckoutPage(){

    const history = useHistory();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart);
    const currentUser = useSelector(state=>state.session.users)
    

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
                <form>
                    <label>
                        First Name
                        <input type="text" name="firstName" />
                    </label>
                    <label>
                        Last Name
                        <input type="text" name="lastName" />
                    </label>
                    <label>
                        Address
                        <input type="text" name="addressLine1" />
                    </label>
                    <label>
                        Address (cont.)
                        <input type="text" name="addressLine2" />
                    </label>
                    <label>
                        State
                        <input type="text" name="state" />
                    </label>
                    <label>
                        Zip or Postal Code
                        <input type="text" name="zipCode" />
                    </label>
                    <label>
                        City
                        <input type="text" name="city" />
                    </label>
                    <div>Your order</div>
                    <CartItemModuleCore />
                    <button>Submit Order</button>
                </form>
                :
                <div>
                    <div>Oops, looks like you've got an empty cart...</div>
                    <button
                        onClick={() => history.push('/products')}
                        >Browse More
                    </button>
                </div>
            }
        </div>
    )
}

export default CheckoutPage;