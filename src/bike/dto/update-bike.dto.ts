import { z } from "zod";
import { CreateBikeDto } from "./create-bike.dto";

export const UpdateBikeDto = CreateBikeDto.partial();

export type UpdateBikeDtoType = z.infer<typeof UpdateBikeDto>;
