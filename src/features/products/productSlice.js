import {createSlice} from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        filtered: [],
        page: 1,
        search: '',
        isLoading: false,
    },
    reducers: {
        getProducts: (state, action) =>  {
            state.products = action.payload
        },
        setFiltered: (state, action) => {
            state.filtered = state.products.filter(({price}) => price < action.payload)
        },
        getPage: (state, action) => {
            state.page = action.payload;
        },
        setSearch: (state, action) => {
          state.search = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    }
})

export const {getProducts, getPage, setSearch, setFiltered, setLoading} =  productSlice.actions;
export default productSlice.reducer;