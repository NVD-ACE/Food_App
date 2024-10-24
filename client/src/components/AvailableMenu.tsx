import { MenuItem } from "@/types/restaurantType";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useCartStore } from "@/store/useCartStore";
import { useNavigate } from "react-router-dom";
import { DollarSignIcon } from "lucide-react";

const AvailableMenu = ({menus} : {menus: MenuItem[]}) => {
  const { addToCart } = useCartStore();
  const navigate = useNavigate();
  return (
    <div className="md:p-4">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">
        Available Menu
      </h1>
      <div className="grid md:grid-cols-3 space-y-4 md:space-y-0 gap-6">
        {menus?.map((menu: MenuItem, index: number) => (
          <Card
            key={index}
            className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={menu.image}
              alt=""
              className="w-full h-48 object-cover"
            ></img>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {menu.name}
              </h2>
              <p className="text-sm text-gray-600 mt-2 dark:text-gray-400">
                {menu.description}
              </p>
              <h3 className="text-lg font-semibold mt-4">Price:</h3>
              <div className="flex items-center text-lg font-semibold">
                <DollarSignIcon className="text-center" />
                <span className="text-[#d19254]">{menu.price}</span>
              </div>
            </CardContent>
            <CardFooter className="p-4">
              <Button
                onClick={() => {
                  addToCart(menu);
                  navigate("/cart");
                }}
                className="w-full bg-orangre hover:bg-hoverOrange"
              >
                Add to Card
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvailableMenu;
