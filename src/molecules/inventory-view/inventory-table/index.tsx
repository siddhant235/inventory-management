import { Product } from '@/models/inventory'
import ReactTable, { Data } from '@/molecules/common/react-table';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react'
import { inventoryStatColumns } from './config';
interface InventoryTableProps {
    products: Product[]
    isAdmin: boolean;
    onEdit: React.Dispatch<React.SetStateAction<string | null>>
}
const InventoryTable = (props: InventoryTableProps) => {
    const { isAdmin, onEdit, products } = props
    const columnDefs = inventoryStatColumns(isAdmin, onEdit)
    return (
        <div>
            <ReactTable defaultData={products as unknown as Data[]} columns={columnDefs as ColumnDef<Data>[]} />
        </div>
    )
}

export default InventoryTable