import { useState, useEffect } from "react";
import mongoose from "mongoose";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import BrandPage from "@/components/brand-page";
import { ListChecks, LucideTrash2, PhilippinePeso } from "lucide-react";
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
import * as api from "./utils/api";
import logo from './IVP.jpg'; 

interface Sale {
  id: mongoose.Types.ObjectId;
  name: string;
  category: string;
  quantity: number;
  price: number;
  date: string;
}

function Home() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [open, setOpen] = useState<string>("account"); // Default tab is "account"

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const salesData = await UseFetchSales();
        const formattedSales = salesData.map((sale) => ({
          ...sale,
          date: new Date(sale.date).toISOString(),
        }));
        setSales(formattedSales);
        console.log(`Sales fetched: ${formattedSales.length}`);
      } catch (error) {
        console.error("Failed to fetch sales data:", error);
      }
    };

    fetchSales();
  }, []);

  async function handleDeleteSale(saleId: string): Promise<void> {
    try {
      await api.deleteOneSales({ _id: saleId });
      setSales((prevSales) =>
        prevSales.filter((sale) => sale.id.toString() !== saleId)
      );
      console.log(`Successfully deleted sale with ID: ${saleId}`);
    } catch (error) {
      console.error("Error deleting sale:", error);
    }
  }

  return (
    <>
      <header className="bg-dark-background py-6">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={logo}
              alt="Izra Vapeshop Logo"
              className="h-16 w-16 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-28 lg:w-28 rounded-full object-cover transition-all duration-300 ease-in-out glow-effect"
            />
            <h1 className="text-4xl font-bold neon-white-text">
              Izra Vapeshop Inventory System
            </h1>
          </div>
        </div>
      </header>

      <Tabs
        value={open}
        onValueChange={setOpen}
        className="flex-grow container mx-auto p-8 space-y-2"
      >
        <TabsList className="bg-gray-100 w-full grid-cols-2 justify-around">
          <TabsTrigger
            value="account"
            className={`tab-trigger ${open === "account" ? "active-tab" : ""}`}
          >
            <ListChecks className="w-4 h-4 mr-2" /> Inventory
          </TabsTrigger>
          <TabsTrigger
            value="sales"
            className={`tab-trigger ${open === "sales" ? "active-tab" : ""}`}
          >
            <PhilippinePeso className="w-4 h-4 mr-2" /> Sales
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <BrandPage />
        </TabsContent>

        <TabsContent value="sales">
          <Card>
            {/* <CardHeader>
              <CardTitle>Sales Records</CardTitle>
            </CardHeader> */}
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
                  {sales.map((sale) => (
                    <TableRow key={sale.id.toString()}>
                      <TableCell>{sale.name}</TableCell>
                      <TableCell>{sale.category}</TableCell>
                      <TableCell>{sale.quantity}</TableCell>
                      <TableCell>${sale.price.toFixed(2)}</TableCell>
                      <TableCell>
                        ${(sale.price * sale.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {new Date(sale.date).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <LucideTrash2 size={16} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Sale Record
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this sale record?
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction asChild>
                                <Button
                                  onClick={() =>
                                    handleDeleteSale(sale.id.toString())
                                  }
                                >
                                  Delete
                                </Button>
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

      <footer className="bg-dark-background text-gray-300 py-6 min-h-5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold neon-white-text mb-4">
            Izra Vapeshop Inventory System
          </h2>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Izra Vapeshop. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="#" className="footer-link">
              Privacy Policy
            </a>
            <a href="#" className="footer-link">
              Terms of Service
            </a>
            <a href="#" className="footer-link">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
