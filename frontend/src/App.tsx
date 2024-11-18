import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DemoPage from "./components/page";

function App() {
  return (
    <>
      <h1 className="text-6xl">Test</h1>
      <Tabs defaultValue="account" className="w-full h-full ">
        <TabsList className="bg-gray-100 w-full justify-around">
          <TabsTrigger value="account">Inventory</TabsTrigger>
          <TabsTrigger value="password">Sales</TabsTrigger>
        </TabsList>
        {/* For  inventory*/}
        <TabsContent value="account">
          <DemoPage />
        </TabsContent>

        {/* For sales */}
        <TabsContent value="password">Sales</TabsContent>
      </Tabs>
    </>
  );
}

export default App;
