import {z} from 'zod';

export const menuSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  description: z.string().nonempty({ message: "Description is required" }),
  // image: z.instanceof(File).refine((file) => file?.size!== 0, {message: 'Image File is required'}),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, { message: "Image File is required" }),
});
export type MenuFormSchema = z.infer<typeof menuSchema>;
