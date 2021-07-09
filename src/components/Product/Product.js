
import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import DeleteModal from '../../components/Modal/ConfirmDelete/ConfirmDelete'
import './Product.css'

function Product( {id} ) {
    const { user } = useContext(AuthContext); 
    const [productDetails, setProductDetails] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState();
    const { addCartItem } = useContext(ShopContext);
    const history = useHistory();
    const [cart, setCart] = useContext(CartContext);

    const notify = () => toast.success('Added to cart!', {
       duration: 1350,
    }); 

    useEffect(() => {
        try { 
          fetchData();
        } 
        catch(e) {
          console.error(e);
        } 
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])


    async function fetchData() {
        const result = await axios.get(`http://localhost:8090/products/${id}`);
        setProductDetails(result.data);
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

    return (
        <div className="product">
            <div className="product-image-wrapper">
              {/* WORKING ON THE IMAGE */}
              {/* <img className="product-image" alt="Product" src={image} onClick={navigateToDetailPage}/> */}
              
              {/* SHOW ONLY IF ADMIN */}
              {user && user.accessLevels === 'ROLE_ADMIN' &&
              <div className="product-admin-options"> 
                <p className="product-delete" onClick={() => setShowDeleteModal(true)}>Delete</p> 
                <p className="product-edit">Edit</p> 
              </div>
              }
              {/* SHOW ONLY IF SALE */}
              <p className="product-sale">SALE</p>
            </div>
            <div className="product-details-wrapper">
               <p className="product-title">{productDetails.name}</p>
                 <p className="product-description">{productDetails.shortDescription}</p>
                 <br/>
                 {/* SHOW ONLY IF SALE */}
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
        </div>

    );


}
    // const { addCartItem } = useContext(ShopContext);
    // const history = useHistory();
    // const [cart, setCart] = useContext(CartContext);

    // const notify = () => toast.success('Added to cart!', {
    //     duration: 1350,
    // }); 

    // function navigateToDetailPage() {
    //     history.push(`/shop/${id}`)
    // }

    // function addItem() {
    //     const product = {id: id, image: image, name: title, price: price, description: description, amount: 1};
    //     if (cart.find(element => element.id === product.id)) {
    //         let i = cart.indexOf(cart.find(element => element.id === product.id));
    //         cart[i].amount = cart[i].amount+1
    //     } else {
    //         setCart(current => [...current, product])
    //     }
    // }

    // return (
    //     <div className="product">
    //         <div className="product-image-wrapper">
    //             <img className="product-image" alt="Product" src={image} onClick={navigateToDetailPage}/>
    //         </div>
    //         <div className="product-details-wrapper">
    //             <p className="product-title">{title}</p>
    //             <p className="product-description">{description}</p>
    //             <br/>
    //             <p className="product-price">€ {price}</p>
    //             <button className="add-to-cart" onClick={() =>   {
    //               addCartItem();
    //               addItem();
    //               notify();
    //               }} >Add to cart</button>
    //               <Toaster />
    //         </div>
    //     </div>
    // )
    //}

export default Product;
