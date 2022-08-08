import { csrfFetch } from "./csrf";

export const LOAD_REVIEWS_FOR_PRODUCT = "reviews/LOAD_REVIEWS_FOR_PRODUCT";
export const ADD_REVIEW = "reviews/ADD_REVIEW";
export const EDIT_REVIEW = "reviews/EDIT_REVIEW";
export const DELETE_REVIEW = "reviews/DELETE_REVIEW";

const load_reviews_for_product = (reviews)=>({
    type: LOAD_REVIEWS_FOR_PRODUCT,
    reviews
});

const add_review = (review) => ({
    type: ADD_REVIEW, 
    review
});

const edit_review = (reviewId, review) => ({
    type: EDIT_REVIEW,
    reviewId, 
    review
});

const delete_review = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
});

export const loadAllReviewsForProduct = (productId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/products/${productId}`);
    if (response.ok) {
        const reviews = await response.json();
        dispatch (load_reviews_for_product(reviews));
    }
}

/*
needed payload:
productId
userId
title
content
rating
*/
export const addReviewForProduct = (payload) => async dispatch => {
    const { productId, userId, title, content, rating } = payload;
    const response = await csrfFetch(`/api/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
            productId,
            userId,
            title,
            content,
            rating
        })
    });
    

    if (response.ok){
        const newReview = await response.json();
        dispatch (add_review(newReview));
    }
}

export const editReview = (reviewId, payload) => async dispatch => {
    const { title, content, rating } = payload;
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, content, rating})
    });

    if (response.ok){
        const updatedReview = await response.json();
        dispatch (edit_review(reviewId, updatedReview));
    }
}

export const deleteReview = (reviewId) => async dispatch => {
    const response = await csrfFetch (`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });

    if (response.ok){
        const deletedReviewId = await response.json();
        dispatch(delete_review(deletedReviewId));
    }
}

const initialState = {};

const reviewReducer = (state = initialState, action)=>{
    switch (action.type){
        case LOAD_REVIEWS_FOR_PRODUCT:
            const allReviews = {};
            action.reviews.forEach(
                review => (allReviews[review.userId] = review)
            )
            return allReviews;
        case ADD_REVIEW:
            return {...state, [action.review.userId]: action.review};
        case DELETE_REVIEW:
            const deletetemp = { ...state };
            delete deletetemp[action.userId];
            return deletetemp;
        case EDIT_REVIEW:
            const updatetemp = { ...state };
            updatetemp[action.userId] = action.review;
            return updatetemp;
        default:
            return state;
    }
}

export default reviewReducer;