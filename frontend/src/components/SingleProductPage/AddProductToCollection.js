import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllCollections } from '../../store/collection';


function AddProductToCollection({setShowAddToCollectionStatu, setShowAddToCollectionButton}){

    const dispatch = useDispatch();

    const [loaded, setLoaded] = useState(false);
    const collections = useSelector (state => state?.collections);
    const currentUserId = useSelector (state => state.session.user?.id);

    const [collectionId, setCollectionId] = useState(0);
    useEffect(()=>{
        async function hydrate(){
            await dispatch(loadAllCollections(currentUserId))
            .then(()=>setLoaded(true));
        }

        hydrate();
    }, [dispatch])


    const handleSubmit = async e => {
        e.preventDefault();
        //actions pertaining to submission of collection
    }
    return (
        loaded &&
        <>
        {/* {console.log('hitting AddProductToCollection Line7')} */}
            <form onSubmit={handleSubmit}>
                <select name="collections">
                    <option>Add To Existing Collection</option>
                    {Object.values(collections).map(({id, collectionName})=>{
                        return(
                            <option value={id}>{collectionName}</option>
                        )
                    })}
                </select>
                <button>Add To New Collection</button>
                <br />
                <button onClick={(e)=>{
                    e.preventDefault();
                    setShowAddToCollectionButton(false)
                    }}>Cancel</button>
            </form>
        </>
    )
}

export default AddProductToCollection;