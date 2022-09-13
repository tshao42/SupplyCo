import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { loadOneCollection } from '../../store/collection';
import { loadAllProducts } from '../../store/product';


function CollectionInfo(){
    // console.trace(`entered the component`)
    const { collectionId } = useParams();
    
    const [loaded, setLoaded] = useState(false);
    const collection = useSelector(state => state?.collections)
    const collectionItems = useSelector(state => state?.collections)[collectionId]?.Collectionitems;

    const products = useSelector (state =>state?.products);

    console.table(collectionItems);
    const dispatch = useDispatch();

    useEffect(()=>{
        const hydrate = async () => {
            await dispatch(loadOneCollection(collectionId))
            .then(()=>dispatch(loadAllProducts()))
            .then(()=>setLoaded(true));
        }

        hydrate();
    }, [dispatch])
    return(
        loaded&&
        <>
        {/* {console.trace(`collectionInfo`)} */}
            <h1>CollectionInfo! for #{collectionId} </h1>
            {Object.values(collectionItems).map(({productId})=>{
            return(
                <>
                    <Link to={`/products/${productId}`}>
                        {console.table(products[productId])}
                        {products[productId]?.name}
                    </Link>
                    <br />
                </>
            )
        })}
        </>
    )
}

export default CollectionInfo;