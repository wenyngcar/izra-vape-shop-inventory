import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DemoPage from "./components/page";
import { ListChecks, ReceiptRussianRuble } from "lucide-react";
import ItemPage from "./components/item-page";

function App() {
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
        className="flex-grow container mx-auto p-8 space-y-2 "
      >
        <TabsList className="bg-gray-100 w-full  grid-cols-2 justify-around">
          <TabsTrigger value="account">
            {" "}
            <ListChecks className="w-4 h-4 mr-2" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="password">
            <ReceiptRussianRuble className="w-4 h-4 mr-2" />
            Sales
          </TabsTrigger>
        </TabsList>
        {/* For  inventory*/}
        <TabsContent value="account">
          <DemoPage />
          <ItemPage />
        </TabsContent>

        {/* For sales */}
        <TabsContent value="password">Sales</TabsContent>
      </Tabs>
    </>
  );
}

export default App;
