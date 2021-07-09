import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../components/Product/Product';
import './ProductPage.css';
import { AuthContext } from '../../context/AuthContext';

function Products() {
    const [products, setProducts] = useState([])
    const [error, setError] = useState('');
    const [loading, toggleLoading] = useState(false); 
    const { user } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        setError('');
            async function fetchData() {
                try {
                    toggleLoading(true);
                    const result = await axios.get(`http://localhost:8090/products`);
                    setProducts(result.data);
                    toggleLoading(false);
                } catch(e) {
                    toggleLoading(false);
                    setError(e);
                } 
            }
        fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      function addProduct() {
          history.push('/add-product');
      }

    return (
    <>
        <div className="product-container">
            <div className="products-overview-items">
                {products.length === 0 ? 
                <p className="no-products">Whooops! There are no products in store! <br/><br/><br/> Sorry, come back later while we fill the shop</p>
                :
                products && products.map((product) => {
                    return (
                        <ProductCard key={product.id} id={product.id} />
                    )
                })}
            </div>
        </div>
        {user && user.accessLevels === 'ROLE_ADMIN' && 
         <button className="add-product-button" onClick={addProduct}>+</button>
        }
        {loading && <span className="loading-data">Data wordt geladen...</span>}
        {error && <span className="error-message">Whoops! Er is iets misgegaan! Probeer het later opnieuw!</span>}
    </>
    );
}

export default Products
