import {createSlice} from '@reduxjs/toolkit';
import productsData from '../../productData';
const INITIAL_STATE = {
    productList : productsData,
    cartList : [],
    orderList: []
}

const productSlice = createSlice({
    name: 'product',
    initialState:INITIAL_STATE,
    reducers:{
        addToCart:(state,action)=>{
            const product  =action.payload;
           // Check if the product is already in the cart
           const existingProduct = state.cartList.find(item => item.ProductName === product.ProductName);
           if (!existingProduct) {
               // If not, add it to the cart with quantity 1
               state.cartList.push({ ...product, ProductQuantity: 1 });
           }
        },
        increaseQuantity: (state, action) => {
            // get the index if product is there in the cart list.
            const index = state.cartList.findIndex(item => item.ProductName === action.payload.ProductName);
            if (index !== -1) {
                state.cartList[index].ProductQuantity++;
            }
        },

        decreaseQuantity: (state, action) => {
            // get the index of the product id element is present in the cart
            const index = state.cartList.findIndex(item => item.ProductName === action.payload.ProductName);
            if (index !== -1 && state.cartList[index].ProductQuantity > 1) {
                state.cartList[index].ProductQuantity--;
            }
        },

        removeFromCart: (state, action) => {
            // get the index of the product which is in the cart list.
            const index = state.cartList.findIndex(item => item.ProductName === action.payload.ProductName);
            if (index !== -1) {
                state.cartList.splice(index, 1);
            }
        },

        orderCart:(state,action)=>{
            state.orderList = action.payload;
            state.cartList=[]
        },
        clearCart:(state,action)=>{
            state.cartList=[]
        }
    }
});

export const {addToCart, increaseQuantity, decreaseQuantity, removeFromCart, orderCart,clearCart} = productSlice.actions;

export default productSlice.reducer;