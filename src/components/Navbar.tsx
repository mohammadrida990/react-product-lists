import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="top-0 sticky flex justify-between items-center bg-blue-200 mx-auto px-4 py-3 container">
      <Link to="/products" className="font-bold text-blue-800 text-lg">
        Home
      </Link>

      <Link to="/cart" className="relative font-semibold text-blue-800">
        🛒 Cart
        {totalItems > 0 && (
          <span className="-top-2 -right-3 absolute bg-red-500 px-2 rounded-full text-white text-xs">
            {totalItems}
          </span>
        )}
      </Link>
    </nav>
  );
}
