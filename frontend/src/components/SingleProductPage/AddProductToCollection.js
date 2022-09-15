import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addItemToCollection, loadAllCollections } from '../../store/collection';


function AddProductToCollection({setShowAddToCollectionStatus, setShowAddToCollectionButton}){

    const dispatch = useDispatch();

    const {productId} = useParams();

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
        let errors = [];
        if (collectionId===0) errors.push("Please select a collection");
        dispatch(addItemToCollection(collectionId, parseInt(productId) ));
        setShowAddToCollectionButton(true);
        setShowAddToCollectionStatus(false);
    }
    return (
        loaded &&
        <>
        {/* {console.log('hitting AddProductToCollection Line7')} */}
            <form>
                <select name="collections"
                onChange={
                    e=>{
                        setCollectionId(e.target.value)
                    }
                }>
                    <option value={0}>Add To Existing Collection</option>
                    {Object.values(collections).map(({id, collectionName})=>{
                        {console.log(collections[id])}
                        if (collections[id].Collectionitems[productId]){
                        return(
                            <option 
                                value={id}
                                disabled
                            >
                                {collectionName}
                            </option>
                        )
                        } else{
                            return(
                                <option 
                                    value={id}
                                >
                                    {collectionName}
                                </option>
                            ) 
                        }
                        
                    })}
                </select>
                <button onClick={handleSubmit}>Add</button>
                <br />
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