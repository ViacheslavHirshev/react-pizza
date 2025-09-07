import { useAppSelector } from "../../hooks";
import { ICartItem } from "../../types";
import { formatCurrency } from "../../utils/helpers";
import { getCurrentQuantityById } from "./cartSlice";
import DeleteItemBtn from "../../ui/DeleteItemBtn";
import UpdateItemQuantity from "../../ui/UpdateItemQuantity";

function CartItem({ item }: { item: ICartItem }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useAppSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <DeleteItemBtn pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
