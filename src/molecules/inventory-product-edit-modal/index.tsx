import { Product } from '@/models/inventory'
import { updateProduct } from '@/store/inventorySlice'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { IoMdClose } from "react-icons/io";
import { Button } from '@/components/ui/button'
interface EditProductModalProps {
    productId: string
    onClose: () => void
}

export default function EditProductModal({ productId, onClose }: EditProductModalProps) {
    const dispatch = useDispatch<AppDispatch>()
    const product = useSelector((state: RootState) =>
        state.inventory.products.find(p => p.id === productId)
    )

    const [editedProduct, setEditedProduct] = useState<Product | null>(product || null)

    if (!editedProduct) {
        return null
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEditedProduct(prev => {
            if (!prev) return null
            const updatedValue: string | number = value

            const updatedProduct = {
                ...prev,
                [name]: updatedValue
            }
            if (name === 'price' || name === 'quantity') {
                const price = name === 'price' ? updatedValue : prev.price
                const quantity = name === 'quantity' ? updatedValue : prev.quantity
                updatedProduct.value = Number(price) * Number(quantity)
            }
            return updatedProduct
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (editedProduct) {
            dispatch(updateProduct(editedProduct))
            onClose()
        }
    }
    const inputClassName = "w-full p-2 border rounded bg-[#3f413d] outline-none border-none"
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="p-6 rounded-lg w-[30vw] bg-[#212123]">
                <div className='flex justify-between'>
                    <h2 className="text-3xl font-bold mb-2">Edit Product</h2>
                    <IoMdClose color='#c2df4e' size={24} onClick={onClose} className="cursor-pointer" />
                </div>
                <h3 className='mb-2 text-xl'>{product?.name}</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-2">
                    <div className="mb-4">
                        <label className="block mb-2">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={editedProduct.category}
                            onChange={handleChange}
                            className={inputClassName}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Price</label>
                        <input
                            type="text"
                            name="price"
                            value={editedProduct.price}
                            onChange={handleChange}
                            className={inputClassName}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={editedProduct.quantity}
                            onChange={handleChange}
                            className={inputClassName}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Value</label>
                        <input
                            type="text"
                            name="value"
                            value={editedProduct.value}
                            onChange={handleChange}
                            className={inputClassName}
                        />
                    </div>
                    <div className="flex col-span-2  justify-end space-x-2">
                        <Button type="button" onClick={onClose} variant={"ghost"}>
                            Cancel
                        </Button>
                        <Button type="submit" variant={"default"}>
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

