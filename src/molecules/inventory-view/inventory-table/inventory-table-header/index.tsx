import React from 'react'
interface InventoryTableHeaderProps {
    textColor?: string;
    fontSize?: number;
    bgColor?: string;
    text: string
}
const InventoryTableHeader = (props: InventoryTableHeaderProps) => {
    const { textColor = '#c2df4e', fontSize, text, bgColor = '#161818' } = props
    return (
        <span style={{ color: textColor, backgroundColor: bgColor, fontSize: fontSize }} className={` p-2 rounded-md  text-lg font-bold`}>
            {text}
        </span>
    )
}

export default InventoryTableHeader