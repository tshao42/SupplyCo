import { csrfFetch } from "./csrf";

export const LOAD_SINGLE_COLLECTION = "collections/LOAD_SINGLE_COLLECTION";
export const LOAD_ALL_USER_COLLECTIONS = "collection/LOAD_ALL_USER_COLLECTIONS";
export const CREATE_COLLECTION = "collection/CREATE_COLLECTION";
export const DELETE_COLLECTION = "collection/DELETE_COLLECTION";
export const EDIT_COLLECTION = "collection/EDIT_COLLECTION";
export const ADD_PRODUCT_TO_COLLECTION = "collection/ADD_PRODUCT_TO_COLLECTION";
export const REMOVE_PRODUCT_FROM_COLLECTION = "collection/REMOVE_PRODUCT_FROM_COLLECTION";


const load_one_collection = (collectionId,collection) => ({
    type: LOAD_SINGLE_COLLECTION,
    collectionId,
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
    type: REMOVE_PRODUCT_FROM_COLLECTION,
    collectionId,
    productId
})


export const loadOneCollection = (collectionId) => async dispatch => {
    const response = await csrfFetch(`/api/collections/${collectionId}`);
    if (response.ok) {
        const collection = await response.json();
        dispatch (load_one_collection(collectionId,collection));
    }
}

export const loadAllCollections = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/collections/users/${userId}`);
    if (response.ok) {
        const collections = await response.json();
        dispatch (load_all_collections(collections));
    }
}

export const createNewCollection = (payload) => async dispatch => {
    const { userId, collectionName } = payload;
    const response = await csrfFetch(`/api/collections`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId, collectionName})
    });

    if (response.ok){
        console.log('hit line 79')
        const newCollection = await response.json();
        dispatch(create_new_collection(newCollection));
    }
}

export const editExistingCollection = (collectionId, payload) => async dispatch =>{
    const { collectionName } = payload;
    const response = await csrfFetch (`/api/collections/${collectionId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {collectionName} )
    });
    
    if (response.ok) {
        const editedCollection = await response.json();
        dispatch(edit_existing_collection(collectionId, editedCollection));
    }
}

export const deleteExistingCollection = (collectionId) => async dispatch =>{
    const response = await csrfFetch(`/api/collections/${collectionId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const deletedCollectionId = await response.json();
        dispatch(delete_existing_collection(deletedCollectionId));
    }
}

export const addItemToCollection = (collectionId, product) => async dispatch=> {
    console.table(JSON.stringify({collectionId, product}))

    const response = await csrfFetch(`/api/collections/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({collectionId, product})
    });


    if (response.ok) {
        const newItemCollection = await response.json();
        dispatch (add_product_to_collection(collectionId, product));
    }
}

export const removeItemFromCollection = (collectionId, productId) => async dispatch =>{
    const response = await csrfFetch(`/api/collections/items/${collectionId}/${productId}`, {
        method: 'DELETE'
    });

    if (response.ok){
        const deletedVersionCollection = await response.json();
        dispatch(remove_item_from_collection(collectionId, productId));
    }
}

const initialState = {};
const collectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SINGLE_COLLECTION:
            const loadSingleCollectionTemp = {};
            
            // console.table(action.collection[0])
            const { Collectionitems, ...collectionProperty } = action.collection[0];
            // console.table(Collectionitems);
            // console.table(collectionProperty);
            loadSingleCollectionTemp[action.collectionId] = collectionProperty;
            loadSingleCollectionTemp[action.collectionId].Collectionitems = {};
            Collectionitems?.forEach(
                item => {
                    loadSingleCollectionTemp[action.collectionId].Collectionitems[item.productId] = item;
                }
            )
            return loadSingleCollectionTemp;
        case LOAD_ALL_USER_COLLECTIONS:
            const loadAllUsercollectionsTemp = {};
            // console.table(action.collections);
            action.collections?.forEach(
                collection =>{
                    const {Collectionitems, ...collectionProperty} = collection;
                    // console.table(Collectionitems);
                    // console.log(collection.id);
                    loadAllUsercollectionsTemp[collection.id] = collectionProperty;
                    loadAllUsercollectionsTemp[collection.id].Collectionitems = {};
                    Collectionitems?.forEach(
                        item => {
                            // console.table(item);
                            loadAllUsercollectionsTemp[collection.id].Collectionitems[item.productId] = item;
                        }
                    )
                }
            )
            return loadAllUsercollectionsTemp;
        case CREATE_COLLECTION:
            return { ...state, [action.collection.id]: action.collection};
        case DELETE_COLLECTION:
            const deleteCopy = { ...state };
            delete deleteCopy[action.collectionId];
            return deleteCopy;
        case EDIT_COLLECTION:
            const editTemp = { ...state };
            editTemp[action.collectionId] = action.collection[0];
            return editTemp;
        case ADD_PRODUCT_TO_COLLECTION:
            const addProductTemp = { ...state };
            // console.table(action.product);
            if (!addProductTemp[action.collectionId].Collectionitems){
                addProductTemp[action.collectionId].Collectionitems={}
            }
            // console.log('hitting line 192')
            addProductTemp[action.collectionId].Collectionitems[action?.product.id] = action?.product;
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