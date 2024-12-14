import { useState, useEffect } from "react";
import mongoose from "mongoose";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import BrandPage from "@/components/brand-page";
import { ListChecks, ReceiptRussianRuble } from "lucide-react";
import AddSaleForm from "@/components/form-add-sale";
import { UseFetchSales } from "@/hooks/use-fetch-sales";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface Sale {
  id: mongoose.Types.ObjectId;
  name: string;
  category: string;
  quantity: number;
  price: number;
  date: string;
}

function Home() {
  const [sales, setSales] = useState<Sale[]>([]); // State for sales data

  // Fetch sales data
  useEffect(() => {
    const promise = UseFetchSales();
    promise.then((salesData) => {
      const sales = salesData.map((sale) => ({
          ...sale,
          date: sale.date.toISOString(),
      }));
      console.log(`Sales: ${sales.length}`);
      console.log(sales);
      setSales(sales);
    }).catch((error) => {
      console.error("Failed to fetch sales data:", error);
    });
  }, []);

  return (
    <>
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">
              Izra Vapeshop Inventory System
            </h1>
          </div>
        </div>
      </header>

      <Tabs
        defaultValue="account"
        className="flex-grow container mx-auto p-8 space-y-2"
      >
        <TabsList className="bg-gray-100 w-full grid-cols-2 justify-around">
          <TabsTrigger value="account">
            <ListChecks className="w-4 h-4 mr-2" /> Inventory
          </TabsTrigger>
          <TabsTrigger value="sales">
            <ReceiptRussianRuble className="w-4 h-4 mr-2" /> Sales
          </TabsTrigger>
        </TabsList>

        {/* Inventory Tab */}
        <TabsContent value="account">
          <BrandPage />
        </TabsContent>

        {/* Sales Tab */}
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Sales Records</CardTitle>
            </CardHeader>
            <CardContent>
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
                  {sales.map((sale, index) => (
                    <TableRow key={sale.id}>
                      <TableCell>{sale.name}</TableCell>
                      <TableCell>{sale.category}</TableCell>
                      <TableCell>{sale.quantity}</TableCell>
                      <TableCell>${sale.price.toFixed(2)}</TableCell>
                      <TableCell>${(sale.price * sale.quantity).toFixed(2)}</TableCell>
                      <TableCell>{new Date(sale.date).toLocaleString()}</TableCell>
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
    </>
  );
}

export default Home;
