
import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { LanguageContext } from '../../context/LanguageContext'
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import DeleteModal from '../../components/Modal/ConfirmDelete/ConfirmDelete';
import UpdateModal from '../../components/Modal/UpdateProduct/UpdateProductModal';
import data from '../../content/data.json'
import './Product.css';

function Product( {id, imageUrl} ) {
    const { user } = useContext(AuthContext); 
    const [productDetails, setProductDetails] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState();
    const [showUpdateModal, setShowUpdateModal] = useState();
    const { addCartItem } = useContext(ShopContext);
    const history = useHistory();
    const [cart, setCart] = useContext(CartContext);
    const { language } = useContext(LanguageContext);

    // to update products directly, creates huge dataflow
    // useEffect(() => {
    //     try {
    //       // fetchData();
    //     } catch(e) {
    //       console.error(e);
    //     } 
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    //   }, [productDetails])

    useEffect(() => {
      try {
        fetchData();
      } catch (e) {
        console.error(e);
      }
    }, [])


    async function fetchData() {
        try {
          const result = await axios.get(`http://localhost:8090/products/${id}`);
              setProductDetails(result.data)
              setProductImages(result.data.images);
            } catch (e) {
              console.error(e);
          }
      }

    function notifySuccess() {
      if(language === 'nl') {
        toast.success('Toegevoegd aan winkelwagen!', {
          duration: 1350,
          });
        } else {
          toast.success('Added to cart!', {
            duration: 1350,
            });
        }
    } 

    function notifyNoSuccess() {
      if(language === 'nl') {
          toast.error('Er is geen voorraad beschikbaar', {
            duration: 1350,
            });
          } else {
            toast.error('Currently there is no stock available', {
              duration: 1350,
              });
          }
    }

    function addItem() {
        const sale = calculateNewPrice(productDetails.price, productDetails.saleDiscount)
        const product = {id: id, image: productDetails.images, name: productDetails.name, price: sale, description: productDetails.shortDescription, amount: 1, sale: productDetails.sale};

        if(productDetails.quantity === 0) {
            notifyNoSuccess();
        } else if (cart.find(element => element.id === product.id)) {
            let i = cart.indexOf(cart.find(element => element.id === product.id));
            cart[i].amount = cart[i].amount+1
            addCartItem();
            notifySuccess();
        } else {
            setCart(current => [...current, product])
            addCartItem();
            notifySuccess();
        }
    }

    function calculateNewPrice(price, discountAmount) {
      const discount = 1 - (discountAmount / 100);
      let newPrice = 0;
  
      newPrice = discount * price;
      return newPrice.toFixed(2)
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

    function checkImage() {
      const noImage = `http://localhost:8090/files/default/default.png`;
      const image = (`http://localhost:8090/files/${productDetails.id}/${productImages[0]}`);

      console.log(image)


      if(productDetails.imageString === undefined || productDetails.imageString === null) {
        return noImage;
      } else {
        return image;
      }
    }

    return (
        <div className="product">
          {/* SHOW ONLY IF ADMIN */}
          {user && user.accessLevels === 'ROLE_ADMIN' &&
           productDetails.id !== 1 &&
            <div className="product-admin-options"> 
              <p className="product-delete" onClick={() => setShowDeleteModal(true)}>{data.product[language].delete}</p> 
              <p className="product-edit" onClick={() => setShowUpdateModal(true)}>{data.product[language].edit}</p> 
            </div>
           }
            <div className="product-image-wrapper">
              <img className="product-image" alt="Product" src={checkImage()} width="80%" onClick={navigateToDetailPage}/>
              {productDetails.sale && <p className="product-sale">SALE -{productDetails.saleDiscount}%</p>}
            </div>
            <div className="product-details-wrapper">
               <p className="product-title">{productDetails.name}</p>
                 <p className="product-description">{productDetails.shortDescription}</p>
                 <br/>
                 {productDetails.sale && <p className="product-old-price">€ {productDetails.price}</p>}
                 <div>
                    {/* {productDetails.sale ? */}
                    <p className="product-price">€ {calculateNewPrice(productDetails.price, productDetails.saleDiscount)}</p>
                    {/* : */}
                    {/* <p className="product-price">€ {productDetails.price}</p> */}
                    {/* // } */}
                 </div>
                 <button className="add-to-cart" onClick={() =>   {
                   addItem();
                   }} >{data.product[language].cart}</button>
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
                                      sale={productDetails.sale}
                                      discount={productDetails.saleDiscount}
                                     /> )} 
        </div>

    );
  
}

export default Product;
