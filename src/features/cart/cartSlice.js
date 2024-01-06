import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: []
}
//we should not keep derived state in state (eg. cartTotal, totalItems) as everytime we have to keep them in sync with cart

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state,action){
      state.cart.push(action.payload)
    },
    increaseItemQuantity(state,action){
      //payload = pizzaId
      const item = state.cart.find(item=>item.pizzaId === action.payload)
      item.quantity++
      item.totalPrice = item.quantity * item.unitPrice
    },
    decreaseItemQuantity(state,action){
      //payload = pizzaId
      const item = state.cart.find(item=>item.pizzaId === action.payload)
      item.quantity--
      item.totalPrice = item.quantity * item.unitPrice

      if(item.quantity === 0)
      cartSlice.caseReducers.deleteItem(state,action)
    },
    deleteItem(state,action){
      //payload = pizzaId
      state.cart = state.cart.filter(item=>item.pizzaId !== action.payload)
    },
    clearCart(state){
      state.cart = []
    }
  }
})

export const {addItem,decreaseItemQuantity,deleteItem,increaseItemQuantity,clearCart} = cartSlice.actions

export default cartSlice.reducer

//reusable function related to cart should be in cart slice file
export const getCart = (store) => store.cart.cart

export const getTotalCartQuantity = (store) => store.cart.cart.reduce((sum,item)=>sum + item.quantity,0)

export const getCurrentQuantityById = (id) => (store) => store.cart.cart.find(item=>item.pizzaId===id)?.quantity ?? 0

export const getTotalCartPrice = (store) => store.cart.cart.reduce((sum,item)=>sum + item.totalPrice,0)
