import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrandPage from "@/components/brand-page";
import { ListChecks, PhilippinePeso } from "lucide-react";
import SalesPage from "./components/sales-page";
// import { UseFetchSales } from "@/hooks/use-fetch-sales";

// import * as api from "./utils/api";
import logo from "./IVP.jpg";

function Home() {
  // const [sales, setSales] = useState<Sale[]>([]);
  const [open, setOpen] = useState<string>("inventory"); // Default tab is "inventory"

  // useEffect(() => {
  //   const fetchSales = async () => {
  //     try {
  //       const salesData = await UseFetchSales();
  //       const formattedSales = salesData.map((sale) => ({
  //         ...sale,
  //         date: new Date(sale.date).toISOString(),
  //       }));
  //       setSales(formattedSales);
  //       console.log(`Sales fetched: ${formattedSales.length}`);
  //     } catch (error) {
  //       console.error("Failed to fetch sales data:", error);
  //     }
  //   };

  //   fetchSales();
  // }, []);

  // async function handleDeleteSale(saleId: string): Promise<void> {
  //   try {
  //     await api.deleteOneSales({ _id: saleId });
  //     setSales((prevSales) =>
  //       prevSales.filter((sale) => sale.id.toString() !== saleId)
  //     );
  //     console.log(`Successfully deleted sale with ID: ${saleId}`);
  //   } catch (error) {
  //     console.error("Error deleting sale:", error);
  //   }
  // }

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
            value="inventory"
            className={`tab-trigger ${
              open === "inventory" ? "active-tab" : ""
            }`}
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

        {/* Inventory Tab */}
        <TabsContent value="inventory">
          <BrandPage />
        </TabsContent>

        {/* Sales Tab */}
        <TabsContent value="sales">
          <SalesPage />
        </TabsContent>
      </Tabs>

      <footer className="bg-dark-background text-gray-300 py-6 min-h-5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold neon-white-text mb-4">
            Izra Vapeshop Inventory System
          </h2>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Izra Vapeshop. All rights
            reserved.
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
