import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllProducts } from '../../store/product';
import { Link } from 'react-router-dom';

function ProductsPage() {
    const dispatch = useDispatch();
    const products = useSelector( state => state.products );

    const [loaded, setLoaded] = useState(false);
    // console.dir(products);

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
            <h1> Product List </h1>
            {/* {console.log('hit line 23')} */}
            <div>
            {Object.values(products).map(({id, name, price})=>{return(
                <div key={id}>
                    <Link to={`/products/${id}`}>{name}</Link>
                    <div>{price}</div>
                </div>
            )
            })}
            </div>
        </div>
    )
}

export default ProductsPage;