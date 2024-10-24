import { Label } from "@radix-ui/react-menubar";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useRestaurantStore } from "@/store/useRestaurantStore";

export interface FilterOptionState {
  id: string;
  label: string;
}

const filterOptions: FilterOptionState[] = [
  { id: "burger", label: "Burger" },
  { id: "pizza", label: "Pizza" },
  {
    id: "thali",
    label: "Thali",
  },
  {
    id: "indian",
    label: "Indian",
  },
  {
    id: "biryani",
    label: "Biryani",
  },
  {
    id: "momos",
    label: "Momos",
  },
];

const FilterPage = () => {
  const { setAppliedFilter, appliedFilter, resetAppliedFilter } =
    useRestaurantStore();
  const appliedFilterHandler = (value: string) => {
    // Logic to handle applied filter
    setAppliedFilter(value);
    // Reset applied filter on reset button click
    // if (value === "Reset") {
    //   resetAppliedFilter();
    // }
   
  };
  return (
    <div className="md:w-72">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Filter by cuisines</h1>
        <Button variant={"link"} onClick={resetAppliedFilter}>Reset</Button>
      </div>
      {filterOptions.map((option) => (
        <div key={option.id} className="flex items-center space-x-2 my-5">
          <Checkbox
            id={option.id}
            checked={appliedFilter.includes(option.label)}
            onClick={() => appliedFilterHandler(option.label)}
          />
          <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default FilterPage;
