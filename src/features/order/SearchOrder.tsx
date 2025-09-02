import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!query) return;

    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-yellow-100 rounded-full px-4 py-2 text-sm placeholder:text-stone-600 
        w-28 sm:w-64 sm:focus:w-72 transition-all duration-300
        focus:outline-none focus:ring focus:ring-yellow-500"
      />
    </form>
  );
}

export default SearchOrder;
