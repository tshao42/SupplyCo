import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addItemToCollection, createNewCollection, loadAllCollections } from '../../store/collection';
import './addToCollection.css'


function AddToNewCollection({setAddToNewCollectionButton, setAddToNewCollectionPrompt, setAddToExistingCollectionPrompt}){

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
            await dispatch(createNewCollection(collectionPayload))
            .then(()=>{
                const latestCollection = Math.max.apply(null,Object.keys(collections));
                console.table(collections[latestCollection].id+1);
                console.table(product);
                dispatch(addItemToCollection(collections[latestCollection].id+1, product))
            })
            .then(()=>{
                setAddToExistingCollectionPrompt(true);
                setAddToNewCollectionButton(false);
                setAddToNewCollectionPrompt(true);
            });
        }

    }
    return(
        <>
        <div id="new-collection-add">
            <br />
            <form>
                <label>
                    New Collection Name: {`   `}
                    <input type="text"
                    value={newCollectionName}
                    onChange={e=>setNewCollectionName(e.target.value)}>
                    </input>
                </label>
            <span id="add-to-new-prompt" onClick={e=>handleAddingToNewCollection(e)}>
                Add
            </span>
            <span 
            id="cancel-from-new-prompt"
            onClick={e=>{
                e.preventDefault();
                cancelNewCollectionOptions();
                setAddToNewCollectionPrompt(true);
                setAddToExistingCollectionPrompt(true)
                setAddToNewCollectionButton(false);
            }}>
                Cancel
            </span>
            </form>
        </div>
        </>
    )
}


export default AddToNewCollection;