import { csrfFetch } from "./csrf";

export const LOAD_SINGLE_COLLECTION = "collections/LOAD_SINGLE_COLLECTION";
export const LOAD_ALL_USER_COLLECTIONS = "collection/LOAD_ALL_USER_COLLECTIONS";
export const CREATE_COLLECTION = "collection/CREATE_COLLECTION";
export const DELETE_COLLECTION = "collection/DELETE_COLLECTION";
export const EDIT_COLLECTION = "collection/EDIT_COLLECTION";
export const ADD_PRODUCT_TO_COLLECTION = "collection/ADD_PRODUCT_TO_COLLECTION";
export const REMOVE_PRODUCT_FROM_COLLECTION = "collection/REMOVE_PRODUCT_FROM_COLLECTION";


const load_one_collection = (collection) => ({
    type: LOAD_SINGLE_COLLECTION,
    collection
})

const load_all_collections = (collections) => ({
    type: LOAD_ALL_USER_COLLECTIONS,
    collections
})

const create_new_collection = (collection) => ({
    type: CREATE_COLLECTION,
    collection
})

const edit_existing_collection = (collectionId, collection) => ({
    type: EDIT_COLLECTION,
    collectionId,
    collection
})

const delete_existing_collection = (collectionId) => ({
    type: DELETE_COLLECTION,
    collectionId
})

const add_product_to_collection = (collectionId, product) => ({
    type: ADD_PRODUCT_TO_COLLECTION,
    collectionId,
    product
})

const remove_item_from_collection = (collectionId, productId) => ({
    type: REMOVE_ITEM_FROM_COLLECTION,
    collectionId,
    productId
})


export const loadOneCollection = (collectionId) => async dispatch => {

}

export const loadAllCollections = (userId) => async dispatch => {

}

export const createNewCollection = (payload) => async dispatch => {

}

export const editExistingCollection = (collectionId, payload) => {

}

export const deleteExistingCollection = (collectionId) => {

}

export const addItemToCollection = (collectionId, productId) => {

}

export const removeItemFromCollection = (collectionId, productId) => {

}

const initialState = {};
const collectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SINGLE_COLLECTION:
            const loadSingleCollectionTemp = {};
            const { Collectionitems, ...collectionProperty } = action.collection;
            loadSingleCollectionTemp[action.collection.id] = collectionProperty;
            loadSingleCollectionTemp[action.collection.id].Collectionitems = {};
            Collectionitems.forEach(
                item => {
                    loadSingleCollectionTemp[action.collection.id].Collectionitems[item.id] = item;
                }
            )
            return loadSingleCollectionTemp;
        case LOAD_ALL_USER_COLLECTIONS:
            const loadAllUsercollectionsTemp = {};
            action.collections.forEach(
                collection =>{
                    const {Collectionitems, ...collectionProperty} = collection;
                    loadAllUsercollectionsTemp[collection.id] = collectionProperty;
                    loadAllUsercollectionsTemp[collection.id].Collectionitems = {};
                    Collectionitems.forEach(
                        item => {
                            loadAllUsercollectionsTemp[collection.id].Collectionitems[item.id] = item;
                        }
                    )
                }
            )

        case CREATE_COLLECTION:
            return { ...state, [action.collection.id]: action.collection};
        case DELETE_COLLECTION:
            const deleteCopy = { ...state };
            delete deleteCopy[action.collectionId];
            return deleteCopy;
        case EDIT_COLLECTION:
            const editTemp = { ...state };
            editTemp[action.collectionId] = action.collection;
        case ADD_PRODUCT_TO_COLLECTION:
            const addProductTemp = { ...state };
            addProductTemp[action.collectionId].Collectionitems[action.product.id] = action.product;
            return addProductTemp;
        case REMOVE_PRODUCT_FROM_COLLECTION:
            const removeProductTemp = {...state};
            delete removeProductTemp[action.collectionId].Collectionitems[action.productId];
            return removeProductTemp;
        default:
            return state;
    }
}

export default collectionReducer;