import { csrfFetch } from "./csrf";

export const LOAD_PRODUCTS = "products/LOAD_PRODUCTS";
export const LOAD_SINGLE_PRODUCT = "products/LOAD_SINGLE_PRODUCT"

const load_products = (products) => ({
    type: LOAD_PRODUCTS,
    products
})

const load_single_product = (product) => ({
    type: LOAD_SINGLE_PRODUCT,
    product
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