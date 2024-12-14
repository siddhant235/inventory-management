import { Button } from '@/components/ui/button'
import { Product } from '@/models/inventory'
import { deleteProduct, toggleProductDisabled } from '@/store/inventorySlice'
import { AppDispatch } from '@/store/store'
import { CellContext } from '@tanstack/react-table'
import React from 'react'
import { FaEdit, FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
interface InventoryTableStatsActionProps {
    isAdmin: boolean
    onEdit: (id: string) => void;
    info: CellContext<Product, unknown>
}
const InventoryTableStatsActions = (props: InventoryTableStatsActionProps) => {
    const { isAdmin, onEdit, info } = props
    const product = info.row.original
    const dispatch = useDispatch<AppDispatch>()
    return (
        <div className="flex space-x-2">
            <Button
                onClick={() => onEdit(product.id)}
                disabled={!isAdmin || product.disabled}
                size="sm"
                className={`${(!isAdmin || product.disabled) && 'opacity-50 cursor-not-allowed'}`}
            >
                <FaEdit className="h-4 w-4" color={isAdmin ? 'green' : ''} />
            </Button>
            <Button
                onClick={() => dispatch(toggleProductDisabled(product.id))}
                disabled={!isAdmin}
                size="sm"
                className={`${!isAdmin && 'opacity-50 cursor-not-allowed'}`}
            >
                {product.disabled ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" color={isAdmin ? "pink" : ""} />}
            </Button>
            <Button
                onClick={() => dispatch(deleteProduct(product.id))}
                disabled={!isAdmin}
                size="sm"
                className={`${!isAdmin && 'opacity-50 cursor-not-allowed'}`}
            >
                <FaTrash className="h-4 w-4" color={isAdmin ? "red" : ""} />
            </Button>

        </div>
    )
}

export default InventoryTableStatsActions