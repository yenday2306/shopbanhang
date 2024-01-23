import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeProduct } from '../components/uiComponent/Products';
interface CartState {
  products: Array<TypeProduct & {quantity: number} & {size:string} > ;
}

const initialState:CartState = {
  products : []
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<TypeProduct & {quantity: number}>) => {
      console.log(123, action.payload)
      const newProduct = action.payload;
      state.products.push(newProduct);
    },
    
    removeProduct: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter((product) =>  product.id !== productId);
    },
    buyProducts: (state) => {
      state.products = [];
    },
    
  },
  },
);
export const { addProduct, removeProduct,buyProducts } = cartSlice.actions;

export default cartSlice.reducer;