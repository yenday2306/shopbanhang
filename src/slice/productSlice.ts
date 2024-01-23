import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { instance } from "../axios-instance.ts";
import { TypeProduct } from '../components/uiComponent/Products.tsx';

export interface ProductState {
  // [x: string]: any;
  products: TypeProduct[];
  mainProduct: TypeProduct[]
}

const initialState: ProductState = {
  products: [],
  mainProduct: []
};

export const getListProduct = createAsyncThunk(
  'listproducts/fetchProductList',
  async () => {
    const response = await instance.get('/listproducts');
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'listproducts',
  initialState,
  reducers: {
    saveProduct: (state, action: PayloadAction<TypeProduct[]>) => {
      state.products = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getListProduct.fulfilled, (state, action: PayloadAction<TypeProduct[]>) => {
      state.mainProduct = action.payload;
    });
  },
});

export const {saveProduct} = productSlice.actions;
export default productSlice.reducer;