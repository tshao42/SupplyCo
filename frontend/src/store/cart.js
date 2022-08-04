export const LOAD_CART = "cart/LOAD_CART";
export const ADD_CART_ITEM = "cart/ADD_CART_ITEM";
export const UPDATE_QUANTITY = "cart/UPDATE_QUANTITY";
export const DELETE_CART_ITEM = "cart/DELETE_CART_ITEM";
export const EMPTY_CART = "cart/EMPTY_CART";


//state shape:
//cart: {[productId]: quantity}

const load_cart_items = () => ({
    type: LOAD_CART
})

const add_cart_item = (productId, dprice) => ({
    type: ADD_CART_ITEM,
    productId,
    dprice
})

const update_quantity = (productId, quantity, dprice) => ({
    type: UPDATE_QUANTITY,
    productId,
    quantity,
    dprice
})

const delete_cart_item = (productId, dprice) => ({
    type: DELETE_CART_ITEM,
    productId, 
    dprice
})

const empty_entire_cart = () => ({
    type: EMPTY_CART
})


export const load_cart_items_function = () => async dispatch => {
    dispatch(load_cart_items());
}

export const add_cart_item_function = (productId, dprice) => async dispatch => {
    dispatch(add_cart_item(productId,dprice));
}
export const update_quantity_function = (productId, quantity, dprice) => async dispatch => {
    dispatch(update_quantity(productId, quantity, dprice));
}
export const delete_cart_itemfunction = (productId, dprice) => async dispatch => {
    dispatch(delete_cart_item(productId, dprice));
}
export const empty_entire_cart_function = () => async dispatch => {
    dispatch(empty_entire_cart());
}

const initialState = { total:0 };
const cartReducer = (state = initialState, action) => {
    switch (action.type){
        case LOAD_CART:
            return {...state};
        case ADD_CART_ITEM:
            const addtemp = {...state};
            addtemp[action.productId] = { productId: action.productId, quantity: 1 };
            addtemp.total += action.dprice;
            return addtemp;
        case UPDATE_QUANTITY:
            const temp = {...state};
            temp[action.productId].quantity = action.quantity;
            temp.total += action.dprice;
            return temp;
        case DELETE_CART_ITEM:
            let deletetemp = {...state};
            delete deletetemp[action.productId];
            deletetemp.total += action.dprice;
            return deletetemp;
        case EMPTY_CART:
            return { total: 0 };
        default: return state;
    }
}

export default cartReducer;