import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { ICustomerOrder } from "../../types";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useAppSelector } from "../../hooks";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const actionData = useActionData() as string;
  const username = useAppSelector((state) => state.userReducer.username);

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {actionData && (
              <p className="mt-2 text-xs text-red-500 bg-red-100 rounded-md p-2">
                {actionData}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 mb-12">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 
            focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 "
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" value={JSON.stringify(cart)} name="cart" />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting ? "Placing order..." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [key, String(value)])
  );

  const order: ICustomerOrder = {
    address: data.address,
    cart: JSON.parse(data.cart),
    customer: data.customer,
    phone: data.phone,
    priority: data.priority === "on",
  };

  const { isValid, message } = checkPhoneNumber(order.phone);
  if (!isValid) return message;

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;

function checkPhoneNumber(phone: string) {
  const isValidPhone = (str: string) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
      str
    );

  const error = {
    message: "",
    isValid: true,
  };

  if (!isValidPhone(phone)) {
    return {
      ...error,
      message:
        "Please give us your correct phone number. We might need it to contact you.",
      isValid: false,
    };
  }

  return error;
}
