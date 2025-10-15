import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <CartProvider>
          <Router>
            <div className="mx-auto min-w-screen container">
              <Navbar />

              <Routes>
                <Route path="/" element={<Navigate to="/products" />} />

                <Route path="/products" element={<ProductList />} />

                <Route path="/products/:id" element={<ProductDetails />} />

                <Route path="/cart" element={<Cart />} />

                <Route path="*" element={<div>Page Not Found</div>} />
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
