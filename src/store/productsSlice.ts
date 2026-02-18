import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {api} from '../api';
import type { Product } from '../types/Product';

type ProductsState = {
  items: Product[]
  loading: boolean
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null
}

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  return api.getProducts()
})

export const addProduct = createAsyncThunk(
  'products/add',
  async (product: Omit<Product, 'id'>) => {
    return api.createProduct(product)
  }
)

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id: number) => {
    await api.deleteProduct(id)
    return id
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => { state.loading = true })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error'
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.items.push(action.payload)
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(p => p.id !== action.payload)
      })
  }
})

export default productsSlice.reducer
