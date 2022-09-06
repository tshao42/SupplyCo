import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadOneCollection } from '../../store/collection';


function CollectionInfo(){
    // console.trace(`entered the component`)
    const { collectionId } = useParams();
    
    const dispatch = useDispatch();

    useEffect(()=>{
        const hydrate = async () => {
            await dispatch(loadOneCollection(collectionId));
        }

        hydrate();
    }, [dispatch])
    return(
        <>
        {/* {console.trace(`collectionInfo`)} */}
            <h1>CollectionInfo! for #{collectionId} </h1>
        </>
    )
}

export default CollectionInfo;