import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllProducts } from '../../store/product';
import { Link } from 'react-router-dom';
import { loadAllProductsImages } from '../../store/productimage';

function ProductsPage() {
    const dispatch = useDispatch();
    const products = useSelector( state => state.products );

    const [loaded, setLoaded] = useState(false);
    // console.dir(products);

    useEffect(()=>{
        async function hydrate() {
            await dispatch(loadAllProducts())
            .then(()=>dispatch(loadAllProductsImages()))
            .then(() => setLoaded(true));
        }
        hydrate();
    }, [dispatch]);

    return (
        loaded &&
        <div>
            <h1> Product List </h1>
            <div>
            {Object.values(products).map(({id, name, price})=>{return(
                <div key={id}>
                    <Link to={`/products/${id}`}>{name}</Link>
                    <div>$ {parseFloat(price).toFixed(2)}</div>
                </div>
            )
            })}
            </div>
        </div>
    )
}

export default ProductsPage;