import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

export function Header() {
  return (
    <header
      className="bg-yellow-500 uppercase px-4 py-3 sm:px-6 
    border-b border-stone-300 flex items-center justify-between"
    >
      <Link to="/" className="tracking-widest">
        Fast React Pizza CO.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
