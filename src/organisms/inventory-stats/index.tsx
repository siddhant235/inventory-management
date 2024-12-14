import { Switch } from '@/components/ui/switch'
import EditProductModal from '@/molecules/inventory-product-edit-modal'
import InventoryStatsHeaderCardsView from '@/molecules/inventory-view'
import InventoryTable from '@/molecules/inventory-view/inventory-table'
import { fetchInventory } from '@/store/inventorySlice'
import { AppDispatch, RootState } from '@/store/store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosLogOut } from "react-icons/io";
const InventoryStats = () => {
  const dispatch = useDispatch<AppDispatch>()
  const inventory = useSelector((state: RootState) => state.inventory)
  const [isAdmin, setIsAdmin] = useState(true)
  const [editingProduct, setEditingProduct] = useState<string | null>(null)

  useEffect(() => {
    dispatch(fetchInventory())
  }, [dispatch])

  if (inventory.status === 'loading') {
    return <div>Loading...</div>
  }

  if (inventory.status === 'failed') {
    return <div>Error: {inventory.error}</div>
  }
  return (
    <div className="container mx-auto  p-4">
      <div className="flex justify-end items-center space-x-6">
        <span>{isAdmin ? 'Admin' : 'User'} View</span>
        <Switch checked={isAdmin} onCheckedChange={setIsAdmin} />
        <IoIosLogOut size={24} />
      </div>
      <div className="flex justify-between items-center mt-10 mb-4">
        <h1 className="text-4xl font-medium">Inventory Management</h1>

      </div>
      <InventoryStatsHeaderCardsView products={inventory.products} />
      <InventoryTable
        products={inventory.products}
        isAdmin={isAdmin}
        onEdit={setEditingProduct}
      />
      {editingProduct !== null && (
        <EditProductModal
          productId={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  )
}

export default InventoryStats