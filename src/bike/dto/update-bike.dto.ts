import { z } from "zod";
import { CreateBikeDto } from "./create-bike.dto";

export const UpdateBikeDto = CreateBikeDto.partial();

// Just a sub-type of the CreateBikeDTO type so that not all fields have to be checked everytime, and validation can be performed on whatever field is provided as long as it is a subset of the type createbikedto.
export type UpdateBikeDtoType = z.infer<typeof UpdateBikeDto>;
