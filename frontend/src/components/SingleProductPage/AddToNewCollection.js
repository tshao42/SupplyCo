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

        console.log('hitting line 30')
        let errors = [];
        if (!newCollectionName) errors.push ("Please Name Your Collection!");
        if (newCollectionName.length > 30) errors.push ("Please Name It Under 30 Characters!") 

        if (!errors.length){
            await dispatch(createNewCollection(collectionPayload))
            .then(()=>{
                console.log('hitting line 38')
                const collectionId = Object.values(collections).at(-1)?.id;
                console.table(Object.values(collections).at(-1));
                console.log(`line 40 ${collectionId}`);
                console.log(`line 42 ${parseInt(productId)}`);
                dispatch(addItemToCollection(collectionId, parseInt(productId)))
            });
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