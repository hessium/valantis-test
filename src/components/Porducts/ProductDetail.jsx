import React from 'react';
import './Products.css';
import noPhoto from '../../assets/img/no_img.jpg';

const ProductDetail = ({product}) => {
    return (
        <div className='product'>
            <div className="product__img">
                <img src={noPhoto} alt={product.product}/>
            </div>
            <span className='product__id'>{product.id}</span>
            <h4>
                {product.product}
            </h4>
            <div className='product__price'>
                <span>Цена:</span> <span>{product.price} руб.</span>
            </div>
            {product.brand
                ? <span className='product__brand'>{product.brand}</span>
                : <></>
            }
        </div>
    )
}
export default ProductDetail;
