import React from 'react'
import {useSelector} from "react-redux";
import ProductDetail from "./ProductDetail";
import './Products.css';

const ProductList = () => {
    const {products, filtered} = useSelector((state) => state.products)


    const filteredPrice = products.filter(product =>
        (filtered.length === 0 || (product.price > filtered[0] && product.price < filtered[1]))
    );

    return (
        <div className="products">
            {
                filteredPrice.map((product) =>
                    <ProductDetail key={product.id} product={product}/>
                )
            }
        </div>
    )
}
export default ProductList
