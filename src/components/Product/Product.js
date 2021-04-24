import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';

const Products = (props) => {
    const { img, name, seller, price, stock, key } = props.product;
    // console.log(props.product);
    return (
        <div>
            <div className="product">
                <div>
                    <img src={img} alt="" />
                </div>
                <div>
                    <h4 className="product-name"><Link to={"/product/" + key}>{name}</Link></h4>
                    <p><small>by: {seller}</small></p>
                    <p>${price}</p>
                    <p><small>Only {stock} left in stock - Order soon</small></p>
                    {props.showAddToCart && <button onClick={() => props.handleAddProduct(props.product)} className="main-button">
                        <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                    </button>}
                </div>
            </div>


        </div>
    );
};

export default Products;