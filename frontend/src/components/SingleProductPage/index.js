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

    const currentUserId = useSelector (state => state.session.user?.id);


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

    const addToCart = async e => {
        e.preventDefault();
        dispatch(add_cart_item_function(productIdInt, parseFloat(product.price)))
        .then(()=>setIsInCart(true));
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
                        <div id="single-product-information-block-1">
                            <h1>{product.name}</h1>
                            <div>$ {parseFloat(product.price).toFixed(2)}</div>
                        </div>
                        <div id="single-product-information-block-2">
                            <div id="single-product-item-description">Description: </div>
                            <div>{product.info}</div>
                        </div>
                        {!isInCart &&
                            <button onClick={addToCart} className="single-product-information-cart-button">Add to cart</button>
                        }
                        {isInCart &&
                                <button className="single-product-information-cart-button">In Cart</button>
                        }
                        {currentUserId &&
                            <div>
                                {showAddToCollectionButton &&
                                    <div id="add-to-collection-option" onClick={collapseCollection}><i class="fa-regular fa-heart"></i>{`   Add to collection`}</div>
                                }
                                {showAddToCollectionStatus &&
                                    <AddProductToCollection 
                                        setShowAddToCollectionStatus={setShowAddToCollectionStatus}
                                        setShowAddToCollectionButton={setShowAddToCollectionButton}
                                    />
                                }
                            </div>
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