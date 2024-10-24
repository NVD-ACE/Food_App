import { DollarSignIcon, Minus, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import CheckoutConfirmPage from "./CheckoutConfirmPage";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";

import { CartItem } from "@/types/cartType";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    removeFromTheCart,
    clearCart,
  } = useCartStore();
  let totalAmount = cart.reduce((acc, ele) => {
    return acc + ele.price * ele.quantity;
  }, 0);
  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10">
      <div className="flex justify-end">
        <Button
          onClick={clearCart}
          variant={"link"}
          className="bg-orangre hover:bg-hoverOrange"
        >
          Clear All
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Items</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Prices</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item: CartItem, index: number) => (
            <TableRow key={index}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={item.image} />
                  <AvatarFallback>VN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <DollarSignIcon className="h-4 w-4 text-center" />
                  {item.price}
                </div>
              </TableCell>
              <TableCell>
                <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                  <Button
                    onClick={() => decrementQuantity(item._id)}
                    variant={"outline"}
                    size={"icon"}
                    className="rounded-full bg-gray-200"
                  >
                    <Minus />
                  </Button>
                  <Button
                    size={"icon"}
                    className="font-bold border-none"
                    disabled
                    variant={"outline"}
                  >
                    {item.quantity}
                  </Button>
                  <Button
                    onClick={() => incrementQuantity(item._id)}
                    variant={"outline"}
                    size={"icon"}
                    className="rounded-full bg-orangre hover:bg-hoverOrange"
                  >
                    <Plus />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <DollarSignIcon className="h-4 w-4 text-center" />
                  {item.price * item.quantity}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => removeFromTheCart(item._id)}
                  size={"sm"}
                  variant={"link"}
                  className="bg-orangre hover:bg-hoverOrange"
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="text-2xl font-bold">
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell>
              <div className="flex items-center justify-end">
                <DollarSignIcon className="text-center" />
                <span>{totalAmount}</span>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end my-5">
        {totalAmount > 0 && (
          <Button
            onClick={() => setOpen(true)}
            className="bg-orangre hover:bg-hoverOrange"
          >
            Proceed to Checkout
          </Button>
        )}
      </div>
      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;
