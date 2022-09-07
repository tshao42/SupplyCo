import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllCollections } from '../../store/collection';


function MyCollections() {

    const dispatch = useDispatch();
    const currentUserId = useSelector (state => state.session.user?.id);

    useEffect(()=>{
        async function hydrate (){
            await dispatch(loadAllCollections(currentUserId));
        }
        hydrate();
    }, [dispatch]);
    
    return(
    <>
        <h1>Hello from my collections!</h1>
        <div>{currentUserId}</div>
    </>
    )
}

export default MyCollections;