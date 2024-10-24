import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSignIcon, Loader2, Plus } from "lucide-react";
import { ChangeEvent, useState } from "react";
import EditMenu from "./EditMenu";
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";
interface Menu {
  name: string;
  description: string;
  price: number;
  image: string;
}
// const menus = [
//   {
//     name: "Biryani",
//     description:
//       "Biryani is a mixed rice dish originating among the Muslims of the Indian subcontinent.",
//     price: 10,
//     image:
//       "https://assets.bonappetit.com/photos/58fa460c77d7597407ed4f00/master/pass/winson-taiwan-spread.jpg",
//   },
//   {
//     name: "Biryani",
//     description:
//       "Biryani is a mixed rice dish originating among the Muslims of the Indian subcontinent.",
//     price: 10,
//     image:
//       "https://assets.bonappetit.com/photos/58fa460c77d7597407ed4f00/master/pass/winson-taiwan-spread.jpg",
//   },
//   {
//     name: "Biryani",
//     description:
//       "Biryani is a mixed rice dish originating among the Muslims of the Indian subcontinent.",
//     price: 10,
//     image:
//       "https://assets.bonappetit.com/photos/58fa460c77d7597407ed4f00/master/pass/winson-taiwan-spread.jpg",
//   },
// ];

const AddMenu = () => {
  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);

  const [errors, setErrors] = useState<Partial<MenuFormSchema>>({});
  const [selectedMenu, setSelectedMenu] = useState<MenuFormSchema | Menu>();
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? parseInt(value) : value });
  };
  const { loading, createMenu } = useMenuStore();
  const {restaurant} = useRestaurantStore();
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log(input);
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      //console.error(fieldErrors);
      setErrors(fieldErrors as Partial<MenuFormSchema>);
      return;
    }
    // API
    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());
      if (input.image) {
        formData.append("image", input.image);
      }
      await createMenu(formData);
      setInput({
        name: "",
        description: "",
        price: 0,
        image: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between">
        <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">
          Available Menus
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="bg-orangre hover:bg-hoverOrange">
              <Plus size={20} className="mr-2" />
              Add Menus
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add A New Menu</DialogTitle>
              <DialogDescription>
                Create a menu that will make your restaurant available stand
                out.
              </DialogDescription>
              <form onSubmit={submitHandler} className="space-y-4">
                <div>
                  <Label className="flex justify-start my-2">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    className="focus-visible:ring-transparent"
                    value={input.name}
                    onChange={changeEventHandler}
                    placeholder="Enter the name of the menu"
                  />
                  {errors && (
                    <span className="text-red-600 text-xs italic">
                      {errors.name}
                    </span>
                  )}
                </div>
                <div>
                  <Label className="flex justify-start my-2">Description</Label>
                  <Input
                    type="text"
                    className="focus-visible:ring-transparent"
                    name="description"
                    value={input.description}
                    onChange={changeEventHandler}
                    placeholder="Enter the description of the menu"
                  />
                  {errors && (
                    <span className="text-red-600 text-xs italic">
                      {errors.description}
                    </span>
                  )}
                </div>
                <div>
                  <Label className="flex justify-start my-2">
                    Price in (dollar)
                  </Label>
                  <Input
                    type="number"
                    name="price"
                    placeholder="Enter the price of the menu"
                    value={input.price}
                    onChange={changeEventHandler}
                    className="focus-visible:ring-transparent"
                  />
                  {errors && (
                    <span className="text-red-600 text-xs italic">
                      {errors.price}
                    </span>
                  )}
                </div>
                <div>
                  <Label className="flex justify-start my-2">
                    Upload Menu Image
                  </Label>
                  <Input
                    type="file"
                    name="image"
                    onChange={(e) =>
                      setInput({
                        ...input,
                        image: e.target.files?.[0] || undefined,
                      })
                    }
                  />
                  {errors && (
                    <span className="text-red-600 text-xs italic">
                      {errors.image?.name}
                    </span>
                  )}
                </div>
                <DialogFooter className="mt-5">
                  {loading ? (
                    <Button className="bg-orangre hover:bg-hoverOrange">
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Loading...
                    </Button>
                  ) : (
                    <Button className="bg-orangre hover:bg-hoverOrange">
                      Submit
                    </Button>
                  )}
                </DialogFooter>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      {restaurant?.menus.map((menu, index: number) => (
        <div key={index} className="mt-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border">
            <img
              alt=""
              src={menu.image}
              className="md:h-24 md:w-24 h-48 w-full rounded-lg object-cover"
            />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-800">
                {menu.name}
              </h1>
              <p className="text-sm text-gray-500">{menu.description}</p>
              <div className="flex items-center">
                <h2 className="text-md font-semibold mt-2">Price: </h2>
                <div className="flex text-md font-semibold mt-2">
                  <DollarSignIcon />
                  <span className="font-semibold text-[#d19254]">
                    {menu.price}
                  </span>
                </div>
              </div>
            </div>
            <Button
              size={"sm"}
              className="bg-orangre hover:bg-hoverOrange mt-2"
              onClick={() => {
                setSelectedMenu(menu);
                setEditOpen(true);
              }}
            >
              Edit
            </Button>
          </div>
        </div>
      ))}
      <EditMenu
        selectedMenu={selectedMenu}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
    </div>
  );
};

export default AddMenu;
