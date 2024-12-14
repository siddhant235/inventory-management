import { JSX } from "react"
import { IconType } from "react-icons"

export interface Product {
    id: string
    name: string
    category: string
    price: number | string
    quantity: number
    value: number | string
    disabled: boolean
    action: JSX.Element[]
}
export interface InventoryStatsHeaderConfig {
    totalProducts: number;
    totalStoreValue: string | number;
    outOfStock: number;
    categories: number
}
export interface InventoryStatsCardConfig {
    id: string,
    title: string;
    value: number | string;
    icon: IconType;
}