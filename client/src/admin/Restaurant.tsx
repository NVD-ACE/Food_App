import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  restaurantFromSchema,
  RestaurantFromSchema,
} from "@/schema/restaurantSchema";
import { useRestaurantStore } from "@/store/useRestaurantStore";

import { Loader2 } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const Restaurant = () => {
  const [input, setInput] = useState<RestaurantFromSchema>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });
  const {
    restaurant,
    loading,
    createRestaurant,
    updateRestaurant,
    getRestaurant,
  } = useRestaurantStore();
  const [errors, setErrors] = useState<Partial<RestaurantFromSchema>>({});
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = restaurantFromSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<RestaurantFromSchema>);
      // console.error(result.error);
      return;
    }
    // API call to add restaurant to the database
    //console.log(input);
    try {
      const formData = new FormData();
      formData.append("restaurantName", input.restaurantName);
      formData.append("city", input.city);
      formData.append("country", input.country);
      formData.append("deliveryTime", input.deliveryTime.toString());
      formData.append("cuisines", JSON.stringify(input.cuisines));

      if (input.imageFile) {
        formData.append("imageFile", input.imageFile);
      }

      if (restaurant) {
        // update
        await updateRestaurant(formData);
      } else {
        // create
        await createRestaurant(formData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchRestaurant = async () => {
      await getRestaurant();
      if (restaurant) {
        setInput({
          restaurantName: restaurant.restaurantName || "",
          city: restaurant.city || "",
          country: restaurant.country || "",
          deliveryTime: restaurant.deliveryTime || 0,
          cuisines: restaurant.cuisines
            ? restaurant.cuisines.map((cuisine: string) => cuisine)
            : [],
          imageFile: undefined,
        });
      }
    };
    fetchRestaurant();
    //console.log(restaurant);
  }, []);
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div>
        <div>
          <h1 className="font-extrabold text-2xl mb-5">Add Restaurant</h1>
          <form onSubmit={submitHandler}>
            <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
              {/* Restaurant Name */}
              <div className="">
                <Label className="">Restaurant Name</Label>
                <Input
                  type="text"
                  name="restaurantName"
                  value={input.restaurantName}
                  onChange={changeEventHandler}
                  placeholder="Enter your Restaurant Name"
                  className="focus-visible:ring-transparent mt-2"
                />
                {errors && (
                  <span className="text-red-600 text-xs italic">
                    {errors.restaurantName}
                  </span>
                )}
              </div>
              <div className="">
                <Label className="">City</Label>
                <Input
                  type="text"
                  name="city"
                  value={input.city}
                  onChange={changeEventHandler}
                  placeholder="Enter your City"
                  className="focus-visible:ring-transparent mt-2"
                />
                {errors && (
                  <span className="text-red-600 text-xs italic">
                    {errors.city}
                  </span>
                )}
              </div>
              <div className="">
                <Label className="">Country</Label>
                <Input
                  type="text"
                  name="country"
                  value={input.country}
                  onChange={changeEventHandler}
                  placeholder="Enter your Country"
                  className="focus-visible:ring-transparent mt-2"
                />
                {errors && (
                  <span className="text-red-600 text-xs italic">
                    {errors.country}
                  </span>
                )}
              </div>
              <div className="">
                <Label className="">Delivery Time</Label>
                <Input
                  type="number"
                  name="deliveryTime"
                  value={input.deliveryTime}
                  onChange={changeEventHandler}
                  placeholder="Enter your Delivery Time"
                  className="focus-visible:ring-transparent mt-2"
                />
                {errors && (
                  <span className="text-red-600 text-xs italic">
                    {errors.deliveryTime}
                  </span>
                )}
              </div>
              <div className="">
                <Label className="">Cuisines</Label>
                <Input
                  type="text"
                  name="cuisines"
                  value={input.cuisines}
                  onChange={(e) =>
                    setInput({ ...input, cuisines: e.target.value.split(",") })
                  }
                  placeholder="e.g. Chinese, Italian, Indian"
                  className="focus-visible:ring-transparent mt-2"
                />
                {errors && (
                  <span className="text-red-600 text-xs italic">
                    {errors.cuisines}
                  </span>
                )}
              </div>
              <div className="">
                <Label className="">Upload Restaurant Banner</Label>
                <Input
                  type="file"
                  accept="image/*"
                  name="imageFile"
                  className=" mt-2"
                  onChange={(e) =>
                    setInput({
                      ...input,
                      imageFile: e.target.files?.[0] || undefined,
                    })
                  }
                />
                {errors && (
                  <span className="text-red-600 text-xs italic">
                    {errors.imageFile?.name}
                  </span>
                )}
              </div>
            </div>
            <div className="my-5 w-fit">
              {loading ? (
                <Button disabled className="bg-orangre hover:bg-hoverOrange">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait...
                </Button>
              ) : (
                <Button className="bg-orangre hover:bg-hoverOrange">
                  {restaurant
                    ? "Update Your Restaurant"
                    : "Add Your Restaurant"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;