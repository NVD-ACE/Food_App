import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { Loader2 } from "lucide-react";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
interface Menu {
  name: string;
  description: string;
  price: number;
  image: string;
}
const EditMenu = ({
  selectedMenu,
  editOpen,
  setEditOpen,
}: {
  selectedMenu: MenuFormSchema | undefined | Menu | any;
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [errors, setErrors] = useState<Partial<MenuFormSchema>>({});

  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined as File | undefined,
  });
  const { loading, editMenu } = useMenuStore();
  useEffect(() => {
    setInput({
      name: selectedMenu?.name || "",
      description: selectedMenu?.description || "",
      price: selectedMenu?.price || 0,
      image: undefined,
    });
  }, [selectedMenu]);

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    //[e.target.name]: e.target.value,
    setInput({
      ...input,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      //console.error(fieldErrors);
      setErrors(fieldErrors as Partial<MenuFormSchema>);
      return;
    }
    //console.log(input);
    // API request to update the menu
    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());
      if (input.image) {
        formData.append("image", input.image);
      }
      await editMenu(selectedMenu._id, formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription>
            Edit the details of this menu to make it more appealing.
          </DialogDescription>
        </DialogHeader>
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
              <span className="text-red-600 text-xs italic">{errors.name}</span>
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
            <Label className="flex justify-start my-2">Price in (dollar)</Label>
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
            <Label className="flex justify-start my-2">Upload Menu Image</Label>
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
      </DialogContent>
    </Dialog>
  );
};

export default EditMenu;
