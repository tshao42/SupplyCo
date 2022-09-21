import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadAllCollections } from '../../store/collection';
import { loadAllProducts } from '../../store/product';
import CollectionModal from './CreationModal';


function MyCollections() {

    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const currentUserId = useSelector (state => state.session.user?.id);
    // const products = useSelector (state =>state?.products);
    const collections = useSelector (state => state?.collections);
    useEffect(()=>{
        async function hydrate (){
            await dispatch(loadAllCollections(currentUserId))
            // .then(()=>dispatch(loadAllProducts()))
            .then(()=>setLoaded(true));
        }
        hydrate();
    }, [dispatch]);
    
    return(
    loaded &&
    <>
    {console.table(collections)}
    {/* {console.table(s)}; */}
        <h1>My Collections</h1>
        {Object.values(collections).map(({id, collectionName})=>{
            return(
                <>
                    <Link to={`/mycollections/${id}`}>
                        {collectionName}
                    </Link>
                    <br />
                </>
            )
        })}
        <CollectionModal />
    </>
    )
}

export default MyCollections;