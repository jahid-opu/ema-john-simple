import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { Link, useHistory } from 'react-router-dom';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart,setCart]= useState([]);
    const [orderPlaced,setOrderPlaced]= useState(false);
    const history = useHistory();
    const handleProceedCheckout =()=>{
       history.push("/shipment");

    }

    const handleRemoveProduct = (productKey) =>{
        const newCart = cart.filter(pd => pd.key!==productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(()=>{
        // Cart
        
        const savedCart= getDatabaseCart();
        const productKeys = Object.keys(savedCart)
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key===key)
            product.quantity = savedCart[key];
            return product;
        })
        setCart(cartProducts);
    },[]);
    let thankyou;
    if (orderPlaced) {
        thankyou = <img src={happyImage} alt=""/>
    }
    return (
        <div className="twin-container">
            <div className="product-container">
            {
                cart.map(pd => <ReviewItem 
                    key={pd.key}
                    handleRemoveProduct={handleRemoveProduct}
                    product= {pd}></ReviewItem>)
            }

            {thankyou}
            
            </div>
            <div className="cart">
                <Cart cart = {cart}>
            <button onClick={handleProceedCheckout} className="main-button">Proceed checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;