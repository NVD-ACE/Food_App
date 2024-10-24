import { z } from "zod";

export const restaurantFromSchema = z.object({
  restaurantName: z
    .string()
    .nonempty({ message: "Restaurant Name is required" }),
  city: z.string().nonempty({ message: "City is required" }),
  country: z.string().nonempty({ message: "Country is required" }),
  deliveryTime: z
    .number()
    .min(0, { message: "Delivery Time must be a positive number" }),
  cuisines: z.array(z.string()),
  imageFile: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, { message: "Image File is required" }),
});

export type RestaurantFromSchema = z.infer<typeof restaurantFromSchema>;