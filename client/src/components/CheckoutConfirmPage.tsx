import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";
import { CheckoutSessionRequest } from "@/types/orderType";
import { useCartStore } from "@/store/useCartStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { useOrderStore } from "@/store/useOrderStore";
import { Loader2 } from "lucide-react";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const CheckoutConfirmPage = (props: Props) => {
  const { open, setOpen } = props;
  const { user } = useUserStore();
  const [input, setInput] = useState({
    name: user?.fullname || "",
    email: user?.email || "",
    contact: user?.contact.toString() || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
  });
  const { cart } = useCartStore();
  const { restaurant } = useRestaurantStore();
  const { createCheckoutSession, loading } = useOrderStore();
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // your form handling logic here
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const checkoutHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // your form handling logic here
    // make a POST request to the server with the order details
    // setOpen(false); // close the dialog after the order is confirmed
    // console.log(input);
    try {
      const checkoutData: CheckoutSessionRequest = {
        cartItems: cart.map((item) => ({
          menuId: item._id,
          name: item.name,
          image: item.image,
          price: item.price.toString(),
          quantity: item.quantity.toString(),
        })),
        deliveryDetails: input,
        restaurantId: restaurant?._id as string,
      };
      await createCheckoutSession(checkoutData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle className="font-semibold">
            {" "}
            Review Your Order
          </DialogTitle>
          <DialogDescription className="text-xs">
            Double-check your delivery details and ensure everything is in
            order. When you are ready, hit confirm button to finalize your order
          </DialogDescription>
          <form
            onSubmit={checkoutHandler}
            className="md:flex-row  md:grid grid-cols-2 gap-2 space-y-1 md:space-y-0"
          >
            <div>
              <Label>Fullname</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="focus-visible:ring-transparent"
              ></Input>
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                disabled
                value={input.email}
                onChange={changeEventHandler}
                className="focus-visible:ring-transparent"
              ></Input>
            </div>
            <div>
              <Label>Contact</Label>
              <Input
                type="text"
                name="contact"
                value={input.contact}
                onChange={changeEventHandler}
                className="focus-visible:ring-transparent"
              ></Input>
            </div>
            <div>
              <Label>Address</Label>
              <Input
                type="text"
                name="address"
                value={input.address}
                onChange={changeEventHandler}
                className="focus-visible:ring-transparent"
              ></Input>
            </div>
            <div>
              <Label>City</Label>
              <Input
                type="text"
                name="city"
                value={input.city}
                onChange={changeEventHandler}
                className="focus-visible:ring-transparent"
              ></Input>
            </div>
            <div>
              <Label>Country</Label>
              <Input
                type="text"
                name="country"
                value={input.country}
                onChange={changeEventHandler}
                className="focus-visible:ring-transparent"
              ></Input>
            </div>
            <DialogFooter className="col-span-2 pt-5">
              {loading ? (
                <Button disabled className="bg-hoverOrange">
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Processing...
                </Button>
              ) : (
                <Button className="bg-orangre hover:bg-hoverOrange">
                  Continue To Payment
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutConfirmPage;
