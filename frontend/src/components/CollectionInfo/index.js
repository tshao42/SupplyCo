import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { add_cart_item_function } from '../../store/cart';
import { loadOneCollection } from '../../store/collection';
import { loadAllProducts } from '../../store/product';
import { loadAllProductsImages } from '../../store/productimage';


function CollectionInfo(){
    // console.trace(`entered the component`)
    const { collectionId } = useParams();
    const history = useHistory();
    
    const [loaded, setLoaded] = useState(false);
    const collection = useSelector(state => state?.collections)[collectionId]
    const collectionItems = useSelector(state => state?.collections)[collectionId]?.Collectionitems;


    const images = useSelector(state=>state.productImages)


    const products = useSelector (state =>state?.products);

    // console.table(collectionItems);
    const dispatch = useDispatch();

    useEffect(()=>{
        const hydrate = async () => {
            await dispatch(loadOneCollection(collectionId))
            .then(()=>dispatch(loadAllProducts()))
            .then(()=>dispatch(loadAllProductsImages()))
            .then(()=>setLoaded(true));
        }

        hydrate();
    }, [dispatch])

    const addEverythingToCart = async e=>{
        e.preventDefault();
        Object.values(collectionItems).map(({productId})=>{
            dispatch(add_cart_item_function(productId, parseFloat(products[productId].price)))
        })
    }

    return(
        loaded&&
        <>
        {/* {console.trace(`collectionInfo`)} */}
            <h1>{collection.collectionName} </h1>
            {Object.values(collectionItems).map(({productId})=>{
            return(
                <div key={productId}>
                    <Link to={`/products/${productId}`}>
                        {products[productId]?.name}
                    </Link>
                    <br />
                </div >
            )
            })}
            <button onClick={e=>addEverythingToCart(e)}>Quick Add To Cart</button>
        </>
    )
}

export default CollectionInfo;