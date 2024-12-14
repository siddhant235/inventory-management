import { InventoryStatsCardConfig, InventoryStatsHeaderConfig } from "@/models/inventory";
import { FaShoppingCart } from 'react-icons/fa';
import { RiExchangeDollarLine } from "react-icons/ri";
import { MdRemoveShoppingCart } from "react-icons/md";
import { FaShapes } from "react-icons/fa6";
export const getInventoryStatsHeaderCardsConfig = (inventoryStats: InventoryStatsHeaderConfig): InventoryStatsCardConfig[] => {
    const { totalProducts, totalStoreValue, outOfStock, categories } = inventoryStats
    return [
        { id: "totalProducts", title: "Total Products", value: totalProducts, icon: FaShoppingCart },
        { id: "totalStoreValue", title: "Total Store Value", value: `$${(totalStoreValue as number).toFixed(2)}` as string, icon: RiExchangeDollarLine },
        { id: "outOfStock", title: "Out of Stock", value: outOfStock, icon: MdRemoveShoppingCart },
        { id: "categories", title: "Number of Categories", value: categories, icon: FaShapes }
    ];
}
