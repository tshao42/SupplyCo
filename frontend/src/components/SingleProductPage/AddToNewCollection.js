import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addItemToCollection, createNewCollection } from '../../store/collection';



function AddToNewCollection({setAddToNewCollectionButton, setAddToNewCollectionPrompt}){

    const {productId} = useParams();

    const dispatch = useDispatch();
    const currentUserId = useSelector(state=>state.session.user?.id);
    const [newCollectionName, setNewCollectionName] = useState("");
    const collections = useSelector (state => state?.collections);
    const product= useSelector(state=>state.products[parseInt(productId)])

    const cancelNewCollectionOptions = async e => {
        e.preventDefault();
        setAddToNewCollectionButton(false);
        setAddToNewCollectionPrompt(true);
    }

    const handleAddingToNewCollection = async e => {
        e.preventDefault();
        const collectionPayload = {
            collectionName: newCollectionName,
            userId : currentUserId
        }

        // console.log('hitting line 30')
        let errors = [];
        if (!newCollectionName) errors.push ("Please Name Your Collection!");
        if (newCollectionName.length > 30) errors.push ("Please Name It Under 30 Characters!") 

        if (!errors.length){
            dispatch(createNewCollection(collectionPayload))
            const latestCollection = Math.max.apply(null,Object.keys(collections));
            console.table(product);
            dispatch(addItemToCollection(collections[latestCollection].id+1, product))
            setAddToNewCollectionButton(false);
            setAddToNewCollectionPrompt(true);
        }

    }
    return(
        <>
        <div>
            <br />
            <form onSubmit={handleAddingToNewCollection}>
                <label>
                    New Collection Name
                    <input type="text"
                    value={newCollectionName}
                    onChange={e=>setNewCollectionName(e.target.value)}>
                        
                    </input>
                </label>
                <br />
            <button type="submit">
                Add to New Collection
            </button>
            <br />
            <button onClick={cancelNewCollectionOptions}>
                Cancel
            </button>
            </form>
        </div>
        </>
    )
}


export default AddToNewCollection;