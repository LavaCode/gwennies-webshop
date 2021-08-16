import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../components/Product/Product';
import { AuthContext } from '../../context/AuthContext';
import { LanguageContext } from '../../context/LanguageContext';
import data from '../../content/data.json';
import './ProductPage.css';

function Products() {
    const [products, setProducts] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);
    const history = useHistory();
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        setError('');
        fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      function addProduct() {
          history.push('/add-product');
      }

      async function fetchData() {
        const token = localStorage.getItem('Login-token');

        try {
            const result = await axios.get(`http://localhost:8090/products`);
            console.log(products)
            console.log(productImages)
            console.log(result.data)
            setProducts(result.data);
        } catch(e) {
            setError(e);
        } 
    }

    return (
    <>
     {user && user.accessLevels === 'ROLE_ADMIN' && 
            <p className="admin-message">{data.product[language].admin}</p>
            }
        <div className="product-container">
        
            <div className="products-overview-items">
                {products.length === 0 ? 
                <p className="no-products">{data.product[language].empty}</p>
                :
                products && products.map((product, index) => {
                    const imageUrl = productImages[index]
                    return (
                        <ProductCard key={product.id} id={product.id} imageUrl={imageUrl} />
                    )
                })}
            </div>
        </div>
        {user && user.accessLevels === 'ROLE_ADMIN' && 
         <button className="add-product-button" onClick={addProduct}>+</button>
        }
        {error && <span className="error-message">{data.product[language].error}</span>}
    </>
    );
}

export default Products
