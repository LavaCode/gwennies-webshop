import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../components/Product/Product';
import './ProductPage.css';
import { AuthContext } from '../../context/AuthContext';

function Products() {
    const [products, setProducts] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);
    const history = useHistory();

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
            const imageResult = await axios.get(`http://localhost:8090/files`)
            console.log(imageResult.data)
            setProductImages(imageResult.data)
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
            <p className="admin-message">Do notice, you can not edit or delete BAG_01 since this is a default product. If necessary, edit the backend</p>
            }
        <div className="product-container">
        
            <div className="products-overview-items">
                {products.length === 0 ? 
                <p className="no-products">Whooops! There are no products in store! <br/><br/><br/> Sorry, come back later while we fill the shop</p>
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
        {error && <span className="error-message">Whoops! Er is iets misgegaan! Probeer het later opnieuw!</span>}
    </>
    );
}

export default Products
