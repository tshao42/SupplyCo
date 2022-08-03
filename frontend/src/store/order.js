import { csrfFetch } from "./csrf";

export const LOAD_ORDERS = "orders/LOAD_ORDERS";
export const CREATE_ORDER = "orders/CREATE_ORDER";
export const EDIT_ORDER = "orders/EDIT_ORDER";
export const DELETE_ORDER = "orders/DELETE_ORDER";

const load_orders = (orders) => ({
    type: LOAD_ORDERS,
    orders
});

const create_order = (order) => ({
    type: CREATE_ORDER,
    order
})
const edit_order = (orderId, order) => ({
    type: EDIT_ORDER,
    orderId,
    order
})
const delete_order = (orderId) => ({
    type: DELETE_ORDER,
    orderId
})


export const loadAllUserOrders = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/orders/users/${userId}`);
    if (response.ok) {
        const orders = await response.json();
        dispatch (load_orders(orders));
    }
}

export const loadSingleOrder = (orderId) => async dispatch => {
    const response = await csrfFetch(`/api/orders/${orderId}`);
    if (response.ok) {
        const order = await response.json();
        dispatch(load_orders(order))
    }

}

export const createOrder = (payload) => async dispatch => {
    const { userId, addressPlaceId, orderFor, total, Orderitems} = payload;
    const response = await csrfFetch(`/api/orders`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, addressPlaceId, orderFor, total, Orderitems })
    });
    
    if (response.ok) {
        const newOrder = await response.json();
        dispatch(create_order(newOrder));
    }
}

export const editOrder = (orderId, payload) => async dispatch => {
    const { addressPlaceId, orderFor, total, Orderitems } = payload;
    const response = await csrfFetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({addressPlaceId, orderFor, total, Orderitems})
    })
    if (response.ok) {
        const updatedOrder = await response.json();
        dispatch(edit_order(orderId, updatedOrder));
    }
}

export const deleteOrder = (orderId) => async dispatch => {
    const response = await csrfFetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        const deletedOrderId = await response.json();
        dispatch(delete_order(deletedOrderId));
    }
}

const initialState = {};
const orderReducer =  (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ORDERS:
            const allOrders = { ...state };
            action.orders.forEach(
                order => allOrders[order.id] =order
            );
            return allOrders;
        case CREATE_ORDER:
            return { ...state, [action.order.id]: action.order}
        case EDIT_ORDER:
            const temp = {...state};
            temp[action.orderId] = action.order;
            return temp;
        case DELETE_ORDER:
            const copy = {...state};
            delete copy[action.orderId];
            return copy;
        default: return state;
    }
}

export default orderReducer;