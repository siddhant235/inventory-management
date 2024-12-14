import { Product } from '@/models/inventory'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

interface InventoryState {
    products: Product[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: InventoryState = {
    products: [],
    status: 'idle',
    error: null,
}

export const fetchInventory = createAsyncThunk('inventory/fetchInventory', async () => {
    const response = await fetch('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory')
    return (await response.json()) as Product[]
})

const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        deleteProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(product => product.id !== action.payload)
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            const index = state.products.findIndex(product => product.id === action.payload.id)
            if (index !== -1) {
                state.products[index] = action.payload
            }
        },
        toggleProductDisabled: (state, action: PayloadAction<string>) => {
            const product = state.products.find(product => product.id === action.payload)
            if (product) {

                product.disabled = !product.disabled

            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInventory.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchInventory.fulfilled, (state, action) => {
                const status = 'succeeded'
                const products = action.payload.map(product => {
                    const quantity = Number(product.quantity)
                    // Needed to do this as price and values are string from backend ideally it shouldbe number and currentcy should come separately
                    const price = (product.price as string).split("$")[1]
                    const value = (product.value as string).split("$")[1] || (product.value as string).split("$")[0]
                    return {
                        ...product,
                        id: uuidv4(),
                        quantity: isNaN(quantity) ? 0 : quantity,
                        price: price,
                        value: value,
                        disabled: false
                    }
                })
                return {
                    ...state,
                    status: status,
                    products: products
                }
            })
            .addCase(fetchInventory.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'Failed to fetch inventory'
            })
    },
})

export const { deleteProduct, updateProduct, toggleProductDisabled } = inventorySlice.actions
export default inventorySlice.reducer

