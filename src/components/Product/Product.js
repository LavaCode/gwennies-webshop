
import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import DeleteModal from '../../components/Modal/ConfirmDelete/ConfirmDelete';
import UpdateModal from '../../components/Modal/UpdateProduct/UpdateProductModal';
import './Product.css';

function Product( {id, imageUrl} ) {
    const { user } = useContext(AuthContext); 
    const [productDetails, setProductDetails] = useState([]);
    const [productImage, setProductImage] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState();
    const [showUpdateModal, setShowUpdateModal] = useState();
    const { addCartItem } = useContext(ShopContext);
    const history = useHistory();
    const [cart, setCart] = useContext(CartContext);

    const notify = () => toast.success('Added to cart!', {
       duration: 1350,
    }); 

    useEffect(() => {
        try { 
          fetchData();
        } catch(e) {
          console.error(e);
        } 
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [productDetails])

    useEffect(() => {
      try {
        getImage();
      } catch (e) {
        console.error(e);
      }
    }, [])


    async function fetchData() {
        try {
          const result = await axios.get(`http://localhost:8090/products/${id}`);
          setProductDetails(result.data);
        } catch (e) {
          console.error(e);
        }
      }
    
    async function getImage() {
        try {
          const result = await axios.get(`${imageUrl.url}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
          )
          console.log(result)
          convertString(result.data)

        } catch (e) {
          console.error(e);
        }
    }

    function convertString(input) {
      return input.replace(/\\u[0-9a-fA-F]{4}/g,function(a,b) {
        var charcode = parseInt(b,16);
        console.log(String.fromCharCode(charcode));
      });
    }

    function addItem() {
        const product = {id: id, image: null, name: productDetails.name, price: productDetails.price, description: productDetails.shortDescription, amount: 1};
        if (cart.find(element => element.id === product.id)) {
            let i = cart.indexOf(cart.find(element => element.id === product.id));
            cart[i].amount = cart[i].amount+1
        } else {
            setCart(current => [...current, product])
        }
    }

    function navigateToDetailPage() {
        history.push(`/shop/${id}`)
    }

    const toggleDeleteModal = () => {
      if(showDeleteModal) {
          setShowDeleteModal(false);
      } else {
          setShowDeleteModal(true);
      }
  }

    const closeDeleteModal = e => {
      if(e.target.id === "deleteModal") {
        toggleDeleteModal();
        setShowDeleteModal(false);
      }
  }

  const toggleUpdateModal = () => {
    if(showUpdateModal) {
        setShowUpdateModal(false);
    } else {
        setShowUpdateModal(true);
    }
}

  const closeUpdateModal = e => {
    if(e.target.id === "deleteModal") {
      toggleUpdateModal();
      setShowUpdateModal(false);
    }
}

    return (
        <div className="product">
          <button onClick={getImage}>Click me!</button>
          {/* SHOW ONLY IF ADMIN */}
          {user && user.accessLevels === 'ROLE_ADMIN' &&
           productDetails.name !== 'BAG_01' &&
            <div className="product-admin-options"> 
              <p className="product-delete" onClick={() => setShowDeleteModal(true)}>Delete</p> 
              <p className="product-edit" onClick={() => setShowUpdateModal(true)}>Edit</p> 
            </div>
          }
            <div className="product-image-wrapper">
              {/* WORKING ON THE IMAGE */}
              <img className="product-image" alt="Product" src={`data:image/png:base64,${productImage}`} width="300" onClick={navigateToDetailPage}/>
              
              <p className="product-sale">SALE</p>
            </div>
            <div className="product-details-wrapper">
               <p className="product-title">{productDetails.name}</p>
                 <p className="product-description">{productDetails.shortDescription}</p>
                 <br/>
                 <p className="product-old-price">€ 45 </p>
                 <p className="product-price">€ {productDetails.price}</p>
                 <button className="add-to-cart" onClick={() =>   {
                   addCartItem();
                   addItem();
                   notify();
                   }} >Add to cart</button>
                   <Toaster />
             </div>
             { showDeleteModal && (<DeleteModal toggleDeleteModal={toggleDeleteModal} closeDeleteModal={closeDeleteModal} deleteType='product' productName={productDetails.name} id={productDetails.id}/> )} 
             { showUpdateModal && (<UpdateModal 
                                      id={productDetails.id}
                                      toggleUpdateModal={toggleUpdateModal} 
                                      closeUpdateModal={closeUpdateModal}
                                      productName={productDetails.name}
                                      shortDescription={productDetails.shortDescription}
                                      longDescription={productDetails.longDescription}
                                      articlePrice={productDetails.price}
                                      stockAmount={productDetails.quantity}
                                     /> )} 
        </div>

    );
}

export default Product;
