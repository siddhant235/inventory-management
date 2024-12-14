import { Product } from '@/models/inventory';
import { CellContext } from '@tanstack/react-table';
import React from 'react'
interface InventoryTableHeaderProps {
    textColor?: string;
    fontSize?: number;
    info: CellContext<Product, string | number>;
    textPrefix?: string
}
const InventoryTableTextCellView = (props: InventoryTableHeaderProps) => {
    const { textColor = '#78787a', fontSize, info, textPrefix = "$" } = props
    const { getValue, row, column } = info
    const product = row.original
    const isProductDisabled = product.disabled
    const text = getValue()
    const disabledTextColor = "#EBEBE4"
    const finalText = (column.id === "price" || column.id === "value") ? (textPrefix + text) : text
    return (
        <span style={{ color: `${isProductDisabled ? textColor : disabledTextColor}`, fontSize: fontSize }} className={` p-4 rounded-md text-md `}>
            {finalText}
        </span>
    )
}

export default InventoryTableTextCellView