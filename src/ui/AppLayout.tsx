import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import { Header } from "./Header";
import Loader from "./Loader";

export function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="h-[100dvh] grid grid-rows-[auto_1fr_auto] bg-stone-100">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-scroll">
        <main className="max-w-3xl  mx-auto">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}
