import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams, Link } from 'react-router-dom';
import { add_cart_item_function } from '../../store/cart';
import { loadSingleProduct, updateSingleProduct } from '../../store/product';
import { loadSingleProductImages } from '../../store/productimage';
import { loadAllReviewsForProduct } from '../../store/review';
import NotFound from '../NotFound';
import ReviewDisplay from '../ReviewDisplay';
import AddProductToCollection from './AddProductToCollection';
import "./singleproductpage.css"
import "./addToCollection.css"


function SingleProductPage(){
    
    const dispatch = useDispatch();
    const { productId } = useParams();
    const productIdInt = parseInt(productId);

    const product = useSelector(state => state.products)[productIdInt];
    const cart = useSelector (state => state.cart)[productIdInt];
    const reviews = useSelector(state => state.reviews);
    const images = useSelector(state=>state.productImages)[productIdInt];
    const [loaded, setLoaded] = useState(false);
    const [isInCart, setIsInCart] = useState(cart);
    const [editMode, setEditMode] = useState(false);
    const [allErrors, setAllErrors] = useState([]); //set empty object for error handling markers


    const [showEditButton, setShowEditButton] = useState(true);


    //for editing purposes
    const [ productName, setProductName ] = useState(product?.name);
    const [ productPrice, setProductPrice ] = useState(product?.price);
    const [ description, setDescription] = useState(product?.info)

    const currentUserId = useSelector (state => state.session.user?.id);
    const currentUserIsOwner = useSelector(state=>state.session.user?.ownerStatus);


    const [showAddToCollectionStatus, setShowAddToCollectionStatus] = useState(false);
    const [showAddToCollectionButton, setShowAddToCollectionButton] = useState(true);

    useEffect(()=>{
        async function hydrate(){
            await dispatch(loadSingleProduct(productIdInt))
            .then(()=>dispatch(loadSingleProductImages(productIdInt)))
            .then(()=>dispatch(loadAllReviewsForProduct(productIdInt)))
            .then(() => setLoaded(true));
        }
        hydrate();
    }, [dispatch, productIdInt]);

    useEffect(()=>{
        setProductName(product?.name);
        setProductPrice(product?.price);
        setDescription(product?.info);
    }, [loaded])
    const addToCart = async e => {
        e.preventDefault();
        dispatch(add_cart_item_function(productIdInt, parseFloat(product.price)))
        .then(()=>setIsInCart(true));
    }

    const handleEditSubmit = async e => {
        e.preventDefault();
        let errors = [];        
        //error handling
        //productName: must be longer than 10 characters, shorter than 120 characters
        if (productName.length < 10) {
            errors.push("Product Name Must Be Longer Than 10 Characters");
        } else{
            if (productName.length > 120) {
                errors.push("Product Name Must Be Shorter Than 120 Characters");
            }
        }

        //productPrice:
        if (productPrice <= 0) {
            errors.push("Product Price Must Be Positive");
        }

        //productInfo:
        //cannot be <10char or >1500char
        if (description.length < 10){
            errors.push ("Product Information Must Be Longer Than 10 Characters");
        } else {
            if (description.length > 1500){
                errors.push("Product Information Must Be Shorter Than 1500 Characters");
            }
        }

        setAllErrors(errors);
        // console.table(errors);
        // console.log(errors["name"])
        if (errors.length===0) {
            const payload = {
                name: productName,
                price: productPrice,
                info: description,
            }
            dispatch(updateSingleProduct(productIdInt, payload));
            setEditMode(false);
            setShowEditButton(true);
        }
    }
    const collapseCollection = async e => {
        e.preventDefault();
        setShowAddToCollectionStatus(true);
        setShowAddToCollectionButton(false);
    }
    return(
        loaded
        ?<div>
            <div id="single-product-page-container">
                <Link to='/products' id="single-product-navigate-back">{"< "}Back to products</Link>
                <div id="single-product-middle-container">
                    <div id="single-product-image-container">
                        {Object.values(images).map(({siteUrl,id})=>{
                            return <img key={id} src={siteUrl} className="single-product-page-picture"/>
                        })}
                    </div>
                    <div id="single-product-information-container">
                        {!editMode &&
                        <div>
                            <div id="single-product-information-block-1">
                                <h1>{product.name}</h1>
                                <div>$ {parseFloat(product.price).toFixed(2)}</div>
                            </div>
                            <div id="single-product-information-block-2">
                                <div id="single-product-item-description">Description: </div>
                                <div>{product.info}</div>
                            </div>
                        </div>
                        }
                        {editMode &&
                        <form id="edit-product-form">
                            <ul id="errors-message-single-product">
                                {allErrors.map((error, idx) => <li key={idx}>{error}</li>)}
                            </ul>
                            <div className="edit-product-fields">
                                <label>
                                    Name: 
                                    <br />
                                    <input
                                    id="edit-product-form-name"
                                    type="text"
                                    value={productName}
                                    onChange={
                                        e=>setProductName(e.target.value)
                                    }>
                                    </input>
                                </label>
                            </div>
                            <div className="edit-product-fields">
                                <label>
                                    Price:
                                    <br />
                                    <input
                                    id="edit-product-form-price"
                                    type="number"
                                    value={productPrice}
                                    onChange={
                                        e=>setProductPrice(e.target.value)
                                    }>
                                    </input>
                                </label>
                            </div>
                            <div id="single-product-information-block-2" className="edit-product-fields">
                                <div >Description: </div>
                                <textarea
                                id="edit-product-info"
                                // type="text"
                                value={description}
                                onChange= {
                                    e=> setDescription(e.target.value)
                                }>
                                </textarea>
                            </div>
                            <div>
                                <input
                                id="edit-product-info-submit"
                                type="submit"
                                onClick={handleEditSubmit}>
                                </input>
                            </div>
                            <div id="edit-product-info-cancel"
                            onClick={e=>{
                                e.preventDefault();
                                setEditMode(false);
                                setShowEditButton(true);
                            }}>Cancel</div>
                        </form>
                        }
                        {!isInCart && !currentUserIsOwner &&
                            <button onClick={addToCart} className="single-product-information-cart-button">Add to cart</button>
                        }
                        {isInCart && !currentUserIsOwner &&
                                <button className="single-product-information-cart-button">In Cart</button>
                        }
                        {currentUserId && !currentUserIsOwner &&
                            <div>
                                {showAddToCollectionButton &&
                                    <div id="add-to-collection-option" onClick={collapseCollection}><i className="fa-regular fa-heart"></i>{`   Add to collection`}</div>
                                }
                                {showAddToCollectionStatus &&
                                    <AddProductToCollection 
                                        setShowAddToCollectionStatus={setShowAddToCollectionStatus}
                                        setShowAddToCollectionButton={setShowAddToCollectionButton}
                                    />
                                }
                            </div>
                        }
                        {currentUserIsOwner && showEditButton &&
                            <button
                            id="single-product-page-edit-product-information"
                            onClick={
                                e=>{
                                    e.preventDefault();
                                    setEditMode(true);
                                    setShowEditButton(false);
                                }
                            }>Edit Product Information</button>
                        }
                    </div>
                </div>
                <div id="single-product-page-review-container">
                    <ReviewDisplay reviews={reviews} loaded={loaded}/>
                </div>
            </div>
        </div>
        :<div>
            <NotFound />
        </div>
    )

}

export default SingleProductPage;