import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import md5 from 'md5';
import { format } from 'date-fns';
import axios from "axios";
import {getProducts, setLoading} from "./features/products/productSlice";
import ProductList from "./components/Porducts/ProductList";
import Skeleton from "./components/Skeleton/Skeleton";
import Filter from "./components/Filter/Filter";

function App() {

    const { isLoading, page} = useSelector((state) => state.products)
    const dispatch = useDispatch();
    const apiUrl = 'http://api.valantis.store:40000/';
    const timestamp = format(new Date(), 'yyyyMMdd');
    const password = 'Valantis';
    const token = md5(`${password}_${timestamp}`);


    const fetchProducts = async () => {
        try {
            const response = await axios.post(apiUrl, {
                action: 'get_ids',
                params: {
                    offset: (page - 1) * 50, limit: 50
                },
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth': token,
                }
            });
            const data = response.data;
            const productsId = data.result;
            await fetchProductDetails(productsId)
        } catch (error) {
            console.error('Error:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const fetchProductDetails = async (id) => {
        dispatch(setLoading(true));

        try {
            const uniqueId = new Set(id);
            const uniqueProductIds = Array.from(uniqueId);

            const response = await axios.post(apiUrl, {
                action: 'get_items',
                params: {
                    ids: uniqueProductIds
                },
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth': token,
                }
            });

            const data = response.data;
            const uniqueProducts = [];

            const productsMap = {};
            data.result.forEach((item) => {
                const product = {
                    id: item.id,
                    product: item.product,
                    price: item.price,
                    brand: item.brand,
                };
                if (!productsMap[item.id]) {
                    productsMap[item.id] = product;
                    uniqueProducts.push(product);
                }
            });
            dispatch(getProducts(uniqueProducts));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchProducts()
    }, [page])

  return (
    <div className="App">
        <header>
            <h1>Ювелирные изделия</h1>
        </header>

        <div className="filterWrapper">
            <Filter />
        </div>
        {isLoading ? (
            <div className="skeleton">
                {new Array(10).fill(null).map(_ => <Skeleton />)}
            </div>
        ) : (
            <>
                <ProductList/>
            </>
        )}
    </div>
  );
}

export default App;
