// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <div>
// //         <a href="https://vite.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>
// //           Edit <code>src/App.tsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //     </>
// //   )
// // }

// import Heading from "./components/Heading"
// import { Section } from "./components/Section"
// import Counter from "./components/Counter";
// // import { useState, useCallback, MouseEvent, KeyboardEvent } from 'react'
// import { useState } from 'react'
// import List from "./components/list";

// function App1() { 
//   const [count, setCount]= useState<number>(100)
//   // const addTwo =useCallback((e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>):void => setCount(prev =>prev+1),[])
//   return (
// <>
//     <Heading title={"Hello"} />
//     <Section title={"Different title"}>This is my section.</Section>
//     {/* </COUNTER> */}
//     <Counter setCount={setCount}>Count is {count} </Counter>
//     <List items={["coffee", "Tacos", "Code"]} render = {(item:string) => 
//     <span className="bold">{item}</span>}/> 
//     {/* <button onClick={addTwo}>Add</button> */}
// </>
//   );

// } 



// export default App1 

"use client"

import { useState, useReducer, useCallback, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input" // Ensure this path is correct or create the module if it doesn't exist
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, ChevronUp, Edit, Trash, Plus, Minus, DollarSign, Search, Cloud, Package, ShoppingCart, BarChart } from 'lucide-react'

// Mock data structure
const initialInventory = [
  { 
    id: 1, 
    brand: 'VapeMaster', 
    category: 'E-liquids',
    items: [
      { id: 11, name: 'Strawberry Blast', quantity: 50, price: 19.99, expirationDate: '2024-12-31' },
      { id: 12, name: 'Menthol Chill', quantity: 30, price: 21.99, expirationDate: '2024-11-30' },
    ]
  },
  { 
    id: 2, 
    brand: 'CloudChaser', 
    category: 'Devices',
    items: [
      { id: 21, name: 'Pocket Vape', quantity: 15, price: 39.99, expirationDate: '2025-06-30' },
      { id: 22, name: 'Cloud King', quantity: 10, price: 79.99, expirationDate: '2025-08-31' },
    ]
  },
]

// Action types for useReducer
const ACTIONS = {
  ADD_QUANTITY: 'add_quantity',
  REMOVE_QUANTITY: 'remove_quantity',
  UPDATE_ITEM: 'update_item',
  DELETE_ITEM: 'delete_item',
  SELL_ITEM: 'sell_item',
  ADD_BRAND: 'add_brand',
  ADD_ITEM: 'add_item',
  DELETE_SALE: 'delete_sale',
}

// Reducer function for inventory management
function inventoryReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_BRAND:
      return [...state, { id: Date.now(), brand: action.payload.brand, category: action.payload.category, items: [] }]
    case ACTIONS.ADD_ITEM:
      return state.map(brand => 
        brand.id === action.brandId 
          ? { ...brand, items: [...brand.items, { id: Date.now(), ...action.payload }] }
          : brand
      )
    case ACTIONS.SELL_ITEM:
      return state.map(brand => {
        if (brand.id === action.brandId) {
          return {
            ...brand,
            items: brand.items.map(item => {
              if (item.id === action.itemId) {
                return { ...item, quantity: Math.max(0, item.quantity - action.quantity) }
              }
              return item
            })
          }
        }
        return brand
      })
    default:
      return state.map(brand => {
        if (brand.id === action.brandId) {
          return {
            ...brand,
            items: brand.items.map(item => {
              if (item.id === action.itemId) {
                switch (action.type) {
                  case ACTIONS.ADD_QUANTITY:
                    return { ...item, quantity: item.quantity + 1 }
                  case ACTIONS.REMOVE_QUANTITY:
                    return { ...item, quantity: Math.max(0, item.quantity - 1) }
                  case ACTIONS.UPDATE_ITEM:
                    return { ...item, ...action.payload }
                  default:
                    return item
                }
              }
              return item
            }).filter(item => action.type !== ACTIONS.DELETE_ITEM || item.id !== action.itemId)
          }
        }
        return brand
      })
  }
}

export default function IzraVapeshopInventorySystem() {
  const [inventory, dispatch] = useReducer(inventoryReducer, initialInventory)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [editingItem, setEditingItem] = useState(null)
  const [expandedBrands, setExpandedBrands] = useState({})
  const [expandedSummaryBrands, setExpandedSummaryBrands] = useState({})
  const [sales, setSales] = useState([])
  const [newBrand, setNewBrand] = useState({ brand: '', category: '' })
  const [newItem, setNewItem] = useState({ name: '', quantity: 0, price: 0, expirationDate: '' })
  const [addingItemToBrandId, setAddingItemToBrandId] = useState(null)
  const [isAddBrandDialogOpen, setIsAddBrandDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("inventory")
  const [showInventorySummary, setShowInventorySummary] = useState(false)
  const [salesFilter, setSalesFilter] = useState('all')
  const [sellQuantity, setSellQuantity] = useState(1)

  const handleSearch = () => {
    console.log("Searching for:", search)
  }

  const handleFilter = (value) => setFilter(value)

  const toggleExpand = (id) => {
    setExpandedBrands(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleSummaryExpand = (id) => {
    setExpandedSummaryBrands(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleEdit = (brandId, item) => {
    setEditingItem({ ...item, brandId })
    setIsEditDialogOpen(true)
  }

  const handleUpdate = () => {
    if (editingItem) {
      dispatch({ 
        type: ACTIONS.UPDATE_ITEM, 
        brandId: editingItem.brandId, 
        itemId: editingItem.id, 
        payload: editingItem 
      })
      setEditingItem(null)
      setIsEditDialogOpen(false)
    }
  }

  const handleCancelEdit = () => {
    setEditingItem(null)
    setIsEditDialogOpen(false)
  }

  const handleDelete = (brandId, itemId) => {
    dispatch({ type: ACTIONS.DELETE_ITEM, brandId, itemId })
  }

  const handleSell = useCallback((brandId, item) => {
    dispatch({ type: ACTIONS.SELL_ITEM, brandId, itemId: item.id, quantity: sellQuantity })
    setSales(prev => [...prev, { ...item, quantity: sellQuantity, soldAt: new Date().toISOString(), category: inventory.find(b => b.id === brandId).category }])
    setSellQuantity(1)
  }, [inventory, sellQuantity])

  const handleAddBrand = () => {
    if (newBrand.brand && newBrand.category) {
      dispatch({ type: ACTIONS.ADD_BRAND, payload: newBrand })
      setNewBrand({ brand: '', category: '' })
      setIsAddBrandDialogOpen(false)
    }
  }

  const handleCancelAddBrand = () => {
    setNewBrand({ brand: '', category: '' })
    setIsAddBrandDialogOpen(false)
  }

  const handleAddItem = (brandId) => {
    if (newItem.name && newItem.quantity > 0 && newItem.price > 0) {
      dispatch({ type: ACTIONS.ADD_ITEM, brandId, payload: newItem })
      setNewItem({ name: '', quantity: 0, price: 0, expirationDate: '' })
      setAddingItemToBrandId(null)
    }
  }

  const handleDeleteSale = (index) => {
    setSales(prev => prev.filter((_, i) => i !== index))
  }

  const isNearExpiration = (expirationDate) => {
    const today = new Date()
    const expDate = new Date(expirationDate)
    const threeMonthsFromNow = new Date(today.setMonth(today.getMonth() + 3))
    return expDate <= threeMonthsFromNow
  }

  const filteredInventory = inventory.filter(brand => 
    brand.brand.toLowerCase().includes(search.toLowerCase()) &&
    (filter === 'All' || brand.category === filter)
  )

  const filteredSales = useMemo(() => {
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
    const startOfYear = new Date(now.getFullYear(), 0, 1)

    return sales.filter(sale => {
      const saleDate = new Date(sale.soldAt)
      switch (salesFilter) {
        case 'recent-week':
          return saleDate >= oneWeekAgo
        case 'recent-month':
          return saleDate >= oneMonthAgo
        case 'this-year':
          return saleDate >= startOfYear
        case 'devices':
          return sale.category === 'Devices'
        case 'e-liquids':
          return sale.category === 'E-liquids'
        default:
          return true
      }
    })
  }, [sales, salesFilter])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Cloud className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Izra Vapeshop Inventory System</h1>
          </div>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow container mx-auto p-4 space-y-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="inventory" className="flex items-center justify-center">
            <Package className="w-4 h-4 mr-2" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="sales" className="flex items-center justify-center">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Sales
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-8">
          <div className="flex justify-between items-center">
            <Button 
              onClick={() => setShowInventorySummary(!showInventorySummary)}
              className="bg-primary text-primary-foreground"
            >
              {showInventorySummary ? 'Hide' : 'Show'} Inventory Summary
            </Button>
          </div>

          {showInventorySummary && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="w-6 h-6 mr-2" />
                  Inventory Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Brand</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Total Items</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventory.map(brand => (
                      <>
                        <TableRow key={brand.id} className="cursor-pointer" onClick={() => toggleSummaryExpand(brand.id)}>
                          <TableCell>
                            <div className="flex items-center">
                              {expandedSummaryBrands[brand.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              <span className="ml-2">{brand.brand}</span>
                            </div>
                          </TableCell>
                          <TableCell>{brand.category}</TableCell>
                          <TableCell>{brand.items.length}</TableCell>
                        </TableRow>
                        {expandedSummaryBrands[brand.id] && (
                          <TableRow>
                            <TableCell colSpan={3}>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Item</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Expiration Date</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {brand.items.map(item => (
                                    <TableRow key={item.id} className={isNearExpiration(item.expirationDate) ? 'text-red-500' : ''}>
                                      <TableCell>{item.name}</TableCell>
                                      <TableCell>{item.quantity}</TableCell>
                                      <TableCell>${item.price.toFixed(2)}</TableCell>
                                      <TableCell>{item.expirationDate}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-4">
              <div  className="flex space-x-4">
                <div className="flex-1 flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Search brands..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleSearch} variant="secondary">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <Select onValueChange={handleFilter} defaultValue="All">
                  <SelectTrigger className="w-[180px] bg-secondary text-secondary-foreground">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    <SelectItem value="E-liquids">E-liquids</SelectItem>
                    <SelectItem value="Devices">Devices</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog open={isAddBrandDialogOpen} onOpenChange={setIsAddBrandDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary text-primary-foreground">
                      <Plus className="mr-2 h-4 w-4" /> Add Brand
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Brand</DialogTitle>
                      <DialogDescription>
                        Enter the details for the new brand.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="brand-name" className="text-right">
                          Brand Name
                        </Label>
                        <Input
                          id="brand-name"
                          value={newBrand.brand}
                          onChange={(e) => setNewBrand({ ...newBrand, brand: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="brand-category" className="text-right">
                          Category
                        </Label>
                        <Input
                          id="brand-category"
                          value={newBrand.category}
                          onChange={(e) => setNewBrand({ ...newBrand, category: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={handleCancelAddBrand}>Cancel</Button>
                      <Button onClick={handleAddBrand}>Add Brand</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map(brand => (
                <>
                  <TableRow key={brand.id} className="cursor-pointer" onClick={() => toggleExpand(brand.id)}>
                    <TableCell>
                      <div className="flex items-center">
                        {expandedBrands[brand.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        <span className="ml-2">{brand.brand}</span>
                      </div>
                    </TableCell>
                    <TableCell>{brand.category}</TableCell>
                    <TableCell>
                      <Button onClick={(e) => {
                        e.stopPropagation();
                        setAddingItemToBrandId(brand.id);
                      }} variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" /> Add Item
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedBrands[brand.id] && (
                    <TableRow>
                      <TableCell colSpan={3}>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Item</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead>Expiration Date</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {brand.items.map(item => (
                              <TableRow key={item.id} className={isNearExpiration(item.expirationDate) ? 'text-red-500' : ''}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <Button variant="outline" size="icon" onClick={() => dispatch({ type: ACTIONS.REMOVE_QUANTITY, brandId: brand.id, itemId: item.id })}>
                                      <Minus size={16} />
                                    </Button>
                                    <span>{item.quantity}</span>
                                    <Button variant="outline" size="icon" onClick={() => dispatch({ type: ACTIONS.ADD_QUANTITY, brandId: brand.id, itemId: item.id })}>
                                      <Plus size={16} />
                                    </Button>
                                  </div>
                                </TableCell>
                                <TableCell>${item.price.toFixed(2)}</TableCell>
                                <TableCell>{item.expirationDate}</TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Button variant="outline" size="sm" onClick={() => handleEdit(brand.id, item)}>
                                      <Edit size={16} />
                                    </Button>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button variant="outline" size="sm">
                                          <Trash size={16} />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete the item.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction onClick={() => handleDelete(brand.id, item.id)}>
                                            Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button variant="outline" size="sm">
                                          <DollarSign size={16} />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Confirm Sale</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Are you sure you want to mark this item as sold?
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <div className="py-4">
                                          <Label htmlFor="sell-quantity" className="text-right">
                                            Quantity
                                          </Label>
                                          <Input
                                            id="sell-quantity"
                                            type="number"
                                            value={sellQuantity}
                                            onChange={(e) => setSellQuantity(Math.max(1, parseInt(e.target.value)))}
                                            min="1"
                                            max={item.quantity}
                                          />
                                        </div>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction onClick={() => handleSell(brand.id, item)}>
                                            Confirm Sale
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow>
                  )}
                  
                  {addingItemToBrandId === brand.id && (
                    <TableRow>
                      <TableCell colSpan={3}>
                        <Card>
                          <CardHeader>
                            <CardTitle>Add New Item to {brand.brand}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="item-name">Item Name</Label>
                                <Input
                                  id="item-name"
                                  placeholder="Item Name"
                                  value={newItem.name}
                                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="item-quantity">Quantity</Label>
                                <Input
                                  id="item-quantity"
                                  type="number"
                                  placeholder="Quantity"
                                  value={newItem.quantity}
                                  onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="item-price">Price</Label>
                                <Input
                                  id="item-price"
                                  type="number"
                                  step="0.01"
                                  placeholder="Price"
                                  value={newItem.price}
                                  onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="item-expiration">Expiration Date (Optional)</Label>
                                <Input
                                  id="item-expiration"
                                  type="date"
                                  placeholder="Expiration Date"
                                  value={newItem.expirationDate}
                                  onChange={(e) => setNewItem({ ...newItem, expirationDate: e.target.value })}
                                />
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                              <Button onClick={() => handleAddItem(brand.id)}>Add Item</Button>
                              <Button variant="outline" onClick={() => setAddingItemToBrandId(null)}>Cancel</Button>
                            </div>
                          </CardContent>
                        </Card>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>

          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    value={editingItem?.name || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-quantity">Quantity</Label>
                  <Input
                    id="edit-quantity"
                    type="number"
                    value={editingItem?.quantity || 0}
                    onChange={(e) => setEditingItem({ ...editingItem, quantity: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-price">Price</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    step="0.01"
                    value={editingItem?.price || 0}
                    onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-expiration">Expiration Date</Label>
                  <Input
                    id="edit-expiration"
                    type="date"
                    value={editingItem?.expirationDate || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, expirationDate: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                <Button onClick={handleUpdate}>Update Item</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Sales Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Select onValueChange={setSalesFilter} defaultValue="all">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter sales" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sales</SelectItem>
                    <SelectItem value="recent-week">Recent Week</SelectItem>
                    <SelectItem value="recent-month">Recent Month</SelectItem>
                    <SelectItem value="this-year">This Year</SelectItem>
                    <SelectItem value="devices">Devices</SelectItem>
                    <SelectItem value="e-liquids">E-liquids</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Sold At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSales.map((sale, index) => (
                    <TableRow key={index}>
                      <TableCell>{sale.name}</TableCell>
                      <TableCell>{sale.category}</TableCell>
                      <TableCell>{sale.quantity}</TableCell>
                      <TableCell>${sale.price.toFixed(2)}</TableCell>
                      <TableCell>${(sale.price * sale.quantity).toFixed(2)}</TableCell>
                      <TableCell>{new Date(sale.soldAt).toLocaleString()}</TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash size={16} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Sale Record</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this sale record? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteSale(index)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <footer className="bg-secondary text-secondary-foreground py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Izra Vap eshop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

