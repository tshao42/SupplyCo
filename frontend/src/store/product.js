import { csrfFetch } from "./csrf";

export const LOAD_PRODUCTS = "products/LOAD_PRODUCTS";

const load_products = (products) => ({
    type: LOAD_PRODUCTS,
    products
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
        dispatch (load_products(product));
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
        default: return state;
    }
}

export default productReducer;