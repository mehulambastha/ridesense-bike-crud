import { z } from "zod";

// DTO using Zod for the Creation of Bikes
export const CreateBikeDto = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().int().min(1900, "Year can't be lesser than 1900").max(new Date().getFullYear(), "Year can't be in future!"),
  type: z.enum(['CRUISER', 'SPORT', 'ADVENTURE', 'TOURING', 'DIRT', 'STANDARD'], {
    errorMap: () => ({ message: "Invalid Bike Type" })
  }),
  // mapping an error message if the type of bike is not among the valid types.
  // NOTE:
  // type here is defined as an ENUM for validation. Whereas in the Prisma Schema, type is defined as a string. The reason is that SQLite3 does not natively support ENUM as a valid data type in its table/column type definition.
})

export type CreateBikeDtoType = z.infer<typeof CreateBikeDto>;
