import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteSingleProduct, loadAllProducts } from '../../store/product';



function ProductManagement () {

    const dispatch = useDispatch();
    const sessionUserIsOwner = useSelector(state => state.session.user)?.ownerStatus;
    const products = useSelector( state => state.products );
    const [loaded, setLoaded] = useState(false);
    const [newItemForm, setNewItemForm] = useState(false);

    useEffect(()=>{
        async function hydrate() {
            await dispatch(loadAllProducts())
            .then(() => setLoaded(true));
        }
        hydrate();
    }, [dispatch]);
    return (
        loaded &&
        <div>
            { sessionUserIsOwner?
            <div>
                 {Object.values(products).map(({id, name})=>{return(
                        <div key={id} >
                            <Link to={`/products/${id}`} >{name}</Link>
                            <span onClick={
                                e=>{
                                    e.preventDefault();
                                    dispatch(deleteSingleProduct(parseInt(id)));
                                }
                            }>Delete</span>
                        </div>
                    )
                  })}
                  {!newItemForm &&
                  <div onClick={e=>{
                    e.preventDefault();
                    setNewItemForm(true);
                  }}> 
                    Add New Product 
                  </div>
                  }
                  {newItemForm &&
                  <div>
                    <form>
                        <label>
                            Name
                            <input type="text" />
                        </label>
                        <label>
                            Price
                            <input type="text" />
                        </label>
                        <label>
                            Description
                            <input type="text" />
                        </label>
                        <label>
                            Image URL
                            <input type="text" />
                        </label>
                        <input type="submit"></input>
                        <span onClick={e=>{
                            e.preventDefault();
                            setNewItemForm(false);
                        }}>Cancel</span>
                    </form>
                  </div>}
            </div>
            :
            <div>
                Not Authorized
            </div>
            }
        </div>
    )
}


export default ProductManagement;