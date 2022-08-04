import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams, Link } from 'react-router-dom';
import { add_cart_item_function } from '../../store/cart';
import { loadSingleProduct } from '../../store/product';


function SingleProductPage(){
    
    const dispatch = useDispatch();
    const { productId } = useParams();
    const productIdInt = parseInt(productId);

    const product = useSelector(state => state.products)[productIdInt];
    const cart = useSelector (state => state.cart)[productIdInt];
    const [loaded, setLoaded] = useState(false);
    const [isInCart, setIsInCart] = useState(cart);


    useEffect(()=>{
        async function hydrate(){
            await dispatch(loadSingleProduct(productIdInt))
            .then(() => setLoaded(true));
        }
        hydrate();
    }, [dispatch, productIdInt]);

    const addToCart = async e => {
        e.preventDefault();
        dispatch(add_cart_item_function(productIdInt, parseInt(product.price)))
        .then(()=>setIsInCart(true));
    }

    return(
        loaded&&
        <div>
            <Link to='/products'> {`<--`}Back to products</Link>
            <h1>{product.name}</h1>
            <div>$ {parseFloat(product.price).toFixed(2)}</div>
            <div>{product.info}</div>
            {!isInCart &&
                <button onClick={addToCart}>Add to cart</button>
            }
            {isInCart &&
                <button>In Cart</button>
            }
        </div>
    )

}

export default SingleProductPage;