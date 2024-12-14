import HeaderCard from "@/atoms/header-card"
import { InventoryStatsCardConfig, Product } from "@/models/inventory"
import { getInventoryStatsHeaderCardsConfig } from "./config"


interface InventoryStatsHeaderCardsViewProps {
    products: Product[]
}

export default function InventoryStatsHeaderCardsView(props: InventoryStatsHeaderCardsViewProps) {
    const { products } = props
    let totalProducts = 0
    const totalStoreValue = products.reduce((sum, product) => {
        if (!product.disabled) {
            totalProducts = totalProducts + 1
            const value = Number(product.value)
            return sum + (isNaN(value) ? 0 : value)
        }
        else {
            return sum + 0
        }
    }, 0)
    const outOfStock = products.filter(product => {
        if (!product.disabled) {
            const quantity = Number(product.quantity)
            return isNaN(quantity) || quantity === 0
        }
    }).length
    const categories = new Set(products.map(product => !product.disabled && product.category).filter(Boolean)).size
    const inventoryStatsCardsValue = {
        totalProducts,
        totalStoreValue,
        outOfStock,
        categories
    }
    const inventoryStatsConfig = getInventoryStatsHeaderCardsConfig(inventoryStatsCardsValue)
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {inventoryStatsConfig.map((cardConfig: InventoryStatsCardConfig) => (
                <HeaderCard key={cardConfig.id} title={cardConfig.title} value={cardConfig.value} icon={cardConfig.icon} />
            ))}
        </div>
    )
}

