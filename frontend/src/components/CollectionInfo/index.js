import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { add_cart_item_function, load_cart_items_function, update_quantity_function } from '../../store/cart';
import { deleteExistingCollection, editExistingCollection, loadOneCollection, removeItemFromCollection } from '../../store/collection';
import { loadAllProducts } from '../../store/product';
import { loadAllProductsImages } from '../../store/productimage';
import "./CollectionInfo.css"


function CollectionInfo(){
    // console.trace(`entered the component`)
    const { collectionId } = useParams();
    const history = useHistory();
    
    const [loaded, setLoaded] = useState(false);
    const collection = useSelector(state => state?.collections)[collectionId]
    const collectionItems = useSelector(state => state?.collections)[collectionId]?.Collectionitems;

    const [changeTitle, setChangeTitle] = useState(false);
    const [title, setTitle] = useState(collection?.collectionName);
    const cart = useSelector(state => state?.cart)

    const images = useSelector(state=>state.productImages)


    const products = useSelector (state =>state?.products);

    // console.table(collectionItems);
    const dispatch = useDispatch();

    useEffect(()=>{
        const hydrate = async () => {
            await dispatch(loadOneCollection(collectionId))
            .then(()=>dispatch(loadAllProducts()))
            // .then(()=>dispatch(loadAllProductsImages()))
            .then(()=>setLoaded(true));
        }

        hydrate();
    }, [dispatch])

    useEffect(()=>{
        setTitle(collection?.collectionName)
    }, [collection]);

    const addEverythingToCart = async e=>{
        e.preventDefault();
        Object.values(collectionItems).map(({productId})=>{
            //only add items that are not in cart yet
            if (cart[productId]===undefined){
                dispatch(add_cart_item_function(productId, parseFloat(products[productId].price)))
            } 
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const payload = {
            collectionName: title,
        }

        let errors = [];
        if (!title) errors.push ("Please Name Your Collection!");
        if (title.length > 30) errors.push ("Please Name It Under 30 Characters!") 


        if (errors.length===0){
            dispatch(editExistingCollection(parseInt(collectionId), payload));
            errors = [];
        }
        
        setChangeTitle(false);
    }

    return(
        loaded&&
        <div id="collection-info-container">
        {/* {console.trace(`collectionInfo`)} */}
        {changeTitle
            ?<form>
                <input
                    id="collection-name-rename-form"
                    value={title}
                    onChange={e=>setTitle(e.target.value)}
                />
                <span
                    className="rename-option"
                    id="collection-name-submit-change"
                    onClick={e=>handleSubmit(e)}>
                    Change title
                </span>
                <span
                    className="rename-option"
                    onClick={
                        e=>{
                            e.preventDefault();
                            setChangeTitle(false);
                        }
                }>Cancel</span>
            </form>
            :<h1>
                <span id="remove-collection-option"
                onClick={
                    e=>{
                        e.preventDefault();
                        dispatch(deleteExistingCollection(parseInt(collectionId)));
                        history.push(`/mycollections`)
                    }
                }><i className="fa-solid fa-trash"></i>     </span>            
                {collection.collectionName}   
                <span 
                onClick={
                    e=>{
                        e.preventDefault();
                        setChangeTitle(true);
                    }
                }
                className="rename-option">Rename</span>
            </h1>

        }
            {Object.values(collectionItems).map(({productId})=>{
            return(
                <div key={productId}>
                    <span 
                    onClick={
                        e=>{
                            e.preventDefault();
                            dispatch(removeItemFromCollection(parseInt(collectionId), parseInt(productId)));
                        }
                    }
                    id="collection-delete-option">
                        <i className="fa-solid fa-trash"></i> 
                    </span>
                    <Link to={`/products/${productId}`}>
                        {products[productId]?.name}
                    </Link>
                    <br />
                </div >
            )
            })}
            <button onClick={e=>addEverythingToCart(e)}>Quick Add To Cart</button>
        </div>
    )
}

export default CollectionInfo;