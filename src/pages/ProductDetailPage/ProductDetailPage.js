import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import { CartContext } from '../../context/CartContext';
import { LanguageContext } from '../../context/LanguageContext';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import data from '../../content/data.json'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import './ProductDetailPage.css'; 

function ProductDetailPage() {
    const history = useHistory();
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState([]);
    const [stock, setStock] = useState(false)
    const { addCartItem } = useContext(ShopContext);
    const [cart, setCart] = useContext(CartContext);
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        getDetails();   
    }, [])

    async function getDetails() {
        try { 
            const result = await axios.get(`http://localhost:8090/products/${id}`)
            if(result.data.quantity === 0) {
                setStock(false);
            } else {
                setStock(true);
            }
            setProductDetails(result.data)
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

    function calulateNewPrice(price, discountAmount) {
        const discount = 1 - (discountAmount / 100);
        let newPrice = 0;
    
        newPrice = discount * price;
        return newPrice.toFixed(2)
      }

    function handleClick() {
        history.push('/shop');
    }

    function addItem() {
        const product = {id: productDetails.id, image: productDetails.imageUrl, name: productDetails.name, price: productDetails.price, description: productDetails.shortDescription, amount: 1};
        if(!stock) {
            notifyNoSuccess() 
        } else if (cart.find(element => element.id === product.id)) {
            let i = cart.indexOf(cart.find(element => element.id === product.id));
            cart[i].amount = cart[i].amount+1
            notifySuccess();
            addCartItem(product)
        } else {
            setCart(current => [...current, product])
            notifySuccess();
            addCartItem(product)
        }
    }

    return (
            <div className="product-detail-container">
                <h1 className="detail-title">{productDetails.name}</h1>
                <div className="detail-presentation">
                    {/* <img src={image} alt="Product" className="product-detail-image"></img> */}
                    <div className="select-image-container">
                        {/* <ul className="select-image">
                            <img src={data.imageUrl} alt="small-bag-01" className="product-detail-image-small" onClick={() => setImage(data.imageUrl)}></img>
                            <img src={data.thumbnail1} alt="small-bag-02" className="product-detail-image-small" onClick={() => setImage(data.thumbnail1)}></img>
                            <img src={data.thumbnail2} alt="small-bag-03" className="product-detail-image-small" onClick={() => setImage(data.thumbnail2)}></img>
                        </ul> */}
                    </div>
                </div>
                <div className="stock-product">
                    { !stock ?
                        <p className="detail-stock-product"><AiOutlineCloseCircle color="red" vertical-align="middle" /> {productDetails.quantity} op voorraad, helaas</p>
                    :
                        <p className="detail-stock-product"><AiOutlineCheckCircle color="green" vertical-align="middle" /> {productDetails.quantity} op voorraad</p>
                    }
                </div>
                <h3 className="detail-description">{productDetails.longDescription}</h3>
                {productDetails.sale && <p className="detail-old-price">{productDetails.price}</p>}
                 <div>
                    {productDetails.sale ?
                      <p className="detail-price">€ {calulateNewPrice(productDetails.price, productDetails.saleDiscount)}</p>
                    :
                      <p className="detail-price">€ {productDetails.price}</p>
                    }
                 </div>
                
                <button className="add-to-cart-detail" onClick={() =>   {
                          addItem();
                    }} >{data.product[language].cart}</button> 
                    <Toaster />
                <button className="return-button" onClick={handleClick}>{data.product[language].return}</button>
            </div>
    )
}

export default ProductDetailPage;