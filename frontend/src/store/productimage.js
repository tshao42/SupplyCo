import { csrfFetch } from "./csrf";

export const LOAD_IMAGES = "/productimages/LOAD_IMAGES";
export const LOAD_SINGLE_PRODUCT_IMAGES = "/productimages/LOAD_SINGLE_PRODUCT_IMAGES";

const load_single_images = (images) => ({
    type: LOAD_SINGLE_PRODUCT_IMAGES,
    images
})
const load_images = (images) => ({
    type: LOAD_IMAGES,
    images
})

export const loadSingleProductImages = (productId) => async dispatch => {
    const response = await csrfFetch(`/api/productimages/${productId}`);
    if (response.ok) {
        const images = await response.json();
        dispatch(load_single_images(images));
    }
}

export const loadAllProductsImages = () => async dispatch => {
    const response = await csrfFetch(`/api/productimages`, {
        method: 'GET'
    });
    if (response.ok) {
        const images = await response.json();
        dispatch(load_images(images));
    }
}

const initialState = {};
const productimageReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_IMAGES:
            const temp = {};
            action.images.forEach(
                image => {
                    if (!temp[image.productId]){
                        temp[image.productId] = {};
                        temp[image.productId][image.id] = image;
                    } else {
                        return;
                    }
                }
            )
        return temp;
        case LOAD_SINGLE_PRODUCT_IMAGES:
            const temp2 = {};
            action.images.forEach(
                image => {
                    if (!temp2[image.productId]) {
                        temp2[image.productId] = {};
                        temp2[image.productId][image.id] = image;
                    } else {
                        return;
                    }
                }
            )
            return temp2;
        default: 
            return state;
    }
}

export default productimageReducer;