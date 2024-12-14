import { Product } from "@/models/inventory";
import { createColumnHelper } from "@tanstack/react-table"
import InventoryTableStatsActions from "./inventory-stats-table-actions";
import InventoryTableHeader from "./inventory-table-header";
import InventoryTableTextCellView from "./inventory-table-text-cell-view";
const columnHelper = createColumnHelper<Product>()

export const inventoryStatColumns = (isAdmin: boolean, onEdit: (id: string) => void) => [
    columnHelper.accessor(row => row.name, {
        id: 'name',
        cell: info => <InventoryTableTextCellView info={info} />,
        header: () => <InventoryTableHeader text="Name" />,

    }),
    columnHelper.accessor(row => row.category, {
        id: 'category',
        cell: info => <InventoryTableTextCellView info={info} />,
        header: () => <InventoryTableHeader text="Category" />,

    }),
    columnHelper.accessor(row => row.price, {
        id: 'price',
        cell: info => <InventoryTableTextCellView info={info} />,
        header: () => <InventoryTableHeader text="Price" />,

    }),
    columnHelper.accessor(row => row.quantity, {
        id: 'quantity',
        cell: info => <InventoryTableTextCellView info={info} />,
        header: () => <InventoryTableHeader text="Quantity" />,

    }),
    columnHelper.accessor(row => row.value, {
        id: 'value',
        cell: info => <InventoryTableTextCellView info={info} />,
        header: () => <InventoryTableHeader text="Value" />,

    }),
    columnHelper.accessor("action", {
        id: 'action',
        cell: info => <InventoryTableStatsActions info={info} isAdmin={isAdmin} onEdit={onEdit} />,
        header: () => <InventoryTableHeader text="Actions" />,

    }),
]