import { z } from "zod";

export const CreateBikeDto = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().int().min(1900, "Year can't be lesser than 1900").max(new Date().getFullYear(), "Year can't be in future!"),
  type: z.enum(['CRUISER', 'SPORT', 'ADVENTURE', 'TOURING', 'DIRT', 'STANDARD'], {
    errorMap: () => ({ message: "Invalid Bike Type" })
  }),
})

export type CreateBikeDtoType = z.infer<typeof CreateBikeDto>;
