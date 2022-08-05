import { csrfFetch } from "./csrf";

export const LOAD_ORDERS = "orders/LOAD_ORDERS";
export const LOAD_SINGLE_ORDER = "orders/LOAD_SINGLE_ORDER";
export const CREATE_ORDER = "orders/CREATE_ORDER";
export const EDIT_ORDER = "orders/EDIT_ORDER";
export const DELETE_ORDER = "orders/DELETE_ORDER";
export const NO_ORDER = "orders/NO_ORDER"

const load_orders = (orders) => ({
    type: LOAD_ORDERS,
    orders
});

const load_single_order = (order) => ({
    type: LOAD_SINGLE_ORDER,
    order
})
const create_order = (order) => ({
    type: CREATE_ORDER,
    order
})
const edit_order = (orderId, order, dprice) => ({
    type: EDIT_ORDER,
    orderId,
    order
})
const delete_order = (orderId) => ({
    type: DELETE_ORDER,
    orderId
})
const no_order = () => ({
    type: NO_ORDER
})


export const loadAllUserOrders = (userId) => async dispatch => {
    if (userId){
        const response = await csrfFetch(`/api/orders/users/${userId}`);
        if (response.ok) {
            const orders = await response.json();
            dispatch (load_orders(orders));
        }
    }
    else dispatch(no_order());
}

export const loadSingleOrder = (orderId) => async dispatch => {
    const response = await csrfFetch(`/api/orders/${orderId}`);
    if (response.ok) {
        const order = await response.json();
        dispatch(load_single_order(order[0]))
    }

}

export const createOrder = (payload) => async dispatch => {
    const { userId, address, orderFor, total, Orderitems} = payload;
    const response = await csrfFetch(`/api/orders`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, address, orderFor, total, Orderitems })
    });
    
    if (response.ok) {
        const newOrder = await response.json();
        dispatch(create_order(newOrder));
    }
}

export const editOrder = (orderId, payload) => async dispatch => {
    const { address, orderFor, total, Orderitems } = payload;
    const response = await csrfFetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({address, orderFor, total, Orderitems})
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
            //init
            const allOrders = { ...state };
            //iterate through all orders
            action.orders.forEach(
                order => {
                    //destruct
                    //iterate through everything BUT the Orderitems
                    const { Orderitems, ...orderProperty} = order;
                    allOrders[order.id]=orderProperty;
                    //init Orderitems
                    allOrders[order.id].Orderitems={};
                    Orderitems.forEach(
                        item=> {
                            allOrders[order.id].Orderitems[item.id] = item;
                        }
                    )
                }
            );
            return allOrders;
        case LOAD_SINGLE_ORDER:
            //init
            const oneOrder = {};
            //destruct
            //iterate through everything BUT the Orderitems
            const { Orderitems, ...orderProperty } = action.order;
            oneOrder[action.order.id] = orderProperty;
            oneOrder[action.order.id].Orderitems={};
            Orderitems.forEach(
                item => {
                    oneOrder[action.order.id].Orderitems[item.id] = item;
                }
            )
            return oneOrder;
        case CREATE_ORDER:
            return { ...state, [action.order.id]: action.order}
        case EDIT_ORDER:
            const temp = {...state};
            temp[action.orderId] = action.order;
            temp[action.orderId].total += action.dprice;
            return temp;
        case DELETE_ORDER:
            const copy = {...state};
            delete copy[action.orderId];
            return copy;
        case NO_ORDER:
            return {};
        default: return state;
    }
}

export default orderReducer;