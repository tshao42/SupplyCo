import { csrfFetch } from "./csrf";

export const LOAD_ORDERS = "orders/LOAD_ORDERS"

const load_orders = (orders) => ({
    type: LOAD_ORDERS,
    orders
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

const initialState = {};
const orderReducer =  (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ORDERS:
            const allOrders = { ...state };
            action.orders.forEach(
                order => allOrders[order.id] =order
            );
            return allOrders;
        default: return state;
    }
}

export default orderReducer;