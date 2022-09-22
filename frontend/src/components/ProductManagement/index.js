import React from 'react';
import { useSelector } from 'react-redux';



function ProductManagement () {

    const sessionUserIsOwner = useSelector(state => state.session.user)?.ownerStatus;


    return (
        <div>
            { sessionUserIsOwner?
            <div>
                Hello from Product Management
            </div>
            :
            <div>
            </div>
            }
        </div>
    )
}


export default ProductManagement;