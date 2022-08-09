import { csrfFetch } from "./csrf";

export const LOAD_IMAGES = "/productimages/LOAD_IMAGES";

const load_images = (images) => ({
    type: LOAD_IMAGES,
    images
})

export const loadSingleProductImages = (productId) => async dispatch => {
    const response = await csrfFetch(`/api/productimages/${productId}`);
    if (response.ok) {
        const images = await response.json();
        dispatch(load_images(images));
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
                        temp[image.productId] = {}
                    }
                    temp[image.productId][image.id] = image
                }
            )
        return temp;
        default: 
            return state;
    }
}

export default productimageReducer;