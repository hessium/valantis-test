import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {setFiltered} from "../../features/products/productSlice";


const Filter = () => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const dispatch = useDispatch()


    const handleFilterByPrice = () => {
        dispatch(setFiltered([minPrice, maxPrice]));
    };

    return (
        <div className>
            <div className>
                <div>
                    <h3>Цена, ₽:</h3>
                    <form>
                        <div>
                            <label htmlFor="price1">
                                От:
                                <input
                                    type="number"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                />
                            </label>
                            <label htmlFor="price2">
                                До:
                                <input
                                    type="number"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                />
                            </label>
                        </div>
                        <button style={{width: '100%'}} type="button" onClick={handleFilterByPrice}>
                            Применить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Filter;