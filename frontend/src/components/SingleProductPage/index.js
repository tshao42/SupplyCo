import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams, Link } from 'react-router-dom';
import { add_cart_item_function } from '../../store/cart';
import { loadSingleProduct } from '../../store/product';
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
                        <form>
                            <div>
                                <label>
                                    Name: 
                                    <input
                                    type="text"
                                    value={productName}
                                    onChange={
                                        e=>setProductName(e.target.value)
                                    }>
                                    </input>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Price:
                                    <input
                                    type="text"
                                    value={productPrice}
                                    onChange={
                                        e=>setProductPrice(e.target.value)
                                    }>
                                    </input>
                                </label>
                            </div>
                            <div id="single-product-information-block-2">
                                <div id="single-product-item-description">Description: </div>
                                <textarea
                                // type="text"
                                value={description}
                                onChange= {
                                    e=> setDescription(e.target.value)
                                }>
                                </textarea>
                            </div>
                            <div>
                                <input
                                type="submit"
                                onClick={handleEditSubmit}>
                                </input>
                            </div>
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
                        {currentUserIsOwner &&
                            <button
                            onClick={
                                e=>{
                                    e.preventDefault();
                                    setEditMode(true);
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