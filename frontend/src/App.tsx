import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
