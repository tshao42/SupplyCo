import { csrfFetch } from "./csrf";

export const LOAD_PRODUCTS = "products/LOAD_PRODUCTS";
export const LOAD_SINGLE_PRODUCT = "products/LOAD_SINGLE_PRODUCT"
export const ADD_SINGLE_PRODUCT = "products/ADD_SINGLE_PRODUCT"
export const UPDATE_SINGLE_PRODUCT = "products/UPDATE_SINGLE_PRODUCT"
export const DELETE_SINGLE_PRODUCT = "products/DELETE_SINGLE_PRODUCT"

const load_products = (products) => ({
    type: LOAD_PRODUCTS,
    products
})

const load_single_product = (product) => ({
    type: LOAD_SINGLE_PRODUCT,
    product
})

const add_single_product = (product) => ({
    type: ADD_SINGLE_PRODUCT,
    product
})

const update_single_product = (productId, product) => ({
    type: UPDATE_SINGLE_PRODUCT,
    productId,
    product
})

const delete_single_product = (productId)=>({
    type: DELETE_SINGLE_PRODUCT,
    productId
})

export const loadAllProducts = () => async dispatch => {
    const response = await csrfFetch(`/api/products`);
    if (response.ok){
        const products = await response.json();
        dispatch(load_products(products));
    }
}

export const loadSingleProduct = (productId) => async dispatch => {
    const response = await csrfFetch (`/api/products/${productId}`);
    if (response.ok) {
        const product = await response.json();
        dispatch (load_single_product(product));
    }
}

export const addSingleProduct = (product)=> async dispatch =>{
    const { name, price, info } = product;
    const response = await csrfFetch(`/api/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            price,
            info
        })
    });
    if (response.ok) {
        const newProduct = await response.json();
        dispatch(add_single_product(newProduct));
    }
}

export const updateSingleProduct = (productId, product) => async dispatch => {
    const { name, price, info } = product;
    const response = await csrfFetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            price,
            info
        })
    });
    if (response.ok) {
        const editedProduct = await response.json();
        dispatch(edit_single_product(productId, editedProduct));
    }
}

export const deleteSingleProduct = (productId) => async dispatch => {
    const response = await csrfFetch(`/api/products/${productId}`, {
        method: 'DELETE'
    });
    
    if (response.ok){
        const deletedProductId = await response.json();
        dispatch (delete_single_product(deletedProductId));
    }
}
const initialState = {};
const productReducer = (state = initialState, action) =>{
    switch (action.type){
        case LOAD_PRODUCTS:
            const allProducts = {...state};
            action.products.forEach(
                product => allProducts[product.id] = product
            );
            return allProducts;
        case LOAD_SINGLE_PRODUCT:
            return {[action.product.id]: action.product}
        default: return state;
    }
}

export default productReducer;