import {
  LoaderFunctionArgs,
  useFetcher,
  useLoaderData,
} from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import { INewOrder } from "../../types";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import type { loader as menuLoader } from "../menu/Menu";
import UpdateOrder from "./UpdateOrder";

function Order() {
  type MenuLoaderData = Awaited<ReturnType<typeof menuLoader>>;

  const order = useLoaderData() as INewOrder;

  const fetcher = useFetcher<MenuLoaderData>();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
  }, [fetcher]);

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(Number(estimatedDelivery));

  return (
    <div className="py-6 px-4 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span
              className="bg-red-500 rounded-full py-1 px-3 
            text-sm uppercase font-semibold text-red-50 tracking-wide"
            >
              Priority
            </span>
          )}
          <span
            className="bg-green-500 rounded-full py-1 px-3 
            text-sm uppercase font-semibold text-green-50 tracking-wide"
          >
            {status} order
          </span>
        </div>
      </div>

      <div
        className="flex items-center justify-between flex-wrap gap-2
      bg-stone-200 py-5 px-6"
      >
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(
                Number(estimatedDelivery)
              )} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t border-stone-200">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 py-5 px-6">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && <UpdateOrder />}
    </div>
  );
}

export default Order;

export async function loader({ params }: LoaderFunctionArgs) {
  const order = await getOrder(params.orderId!);
  return order;
}
