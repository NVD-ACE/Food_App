import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { Orders } from "@/types/orderType";
import { DollarSignIcon } from "lucide-react";
import { useEffect } from "react";

const Order = () => {
    const { restaurantOrder, getRestaurantOrders, updateRestaurantOrder } =
      useRestaurantStore();

    const handleStatusChange = async (id: string, status: string) => {
      await updateRestaurantOrder(id, status);
    };
    useEffect(() => {
      getRestaurantOrders();
    }, []);
  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10">
        Orders Overview
      </h1>
      <div className="space-y-8">
        {/* Restaurant Orders display the following */}
        {restaurantOrder.map((order: Orders, idx: number) => (
          <div key={idx}>
            <div className="flex flex-col md:flex-row justify-center items-start sm:items-center bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex-1 mb-6 sm:mb-8 justify-between">
                <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {order.deliveryDetails.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  <span className="font-semibold">Address: </span>
                  {order.deliveryDetails.address}
                </p>
                <p className="flex text-gray-600 dark:text-gray-400 mt-2">
                  <span className="font-semibold ">Total Amount: </span>
                  <DollarSignIcon />
                  {order.totalAmount}
                </p>
              </div>
              <div className="w-full sm:w-1/3 space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Order Status
                </Label>
                <Select onValueChange={(newStatus) => handleStatusChange(order._id,newStatus)} defaultValue={order.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Order Status</SelectLabel>
                      {[
                        "Pending",
                        "Processing",
                        "Delivered",
                        "Cancelled",
                        "Preparing",
                        "OutForDelivery",
                      ].map((status, index) => (
                        <SelectItem key={index} value={status.toLowerCase()}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
