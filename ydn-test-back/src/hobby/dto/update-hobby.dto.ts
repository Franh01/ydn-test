import { CreateHobbyDto } from "./create-hobby.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateHobbyDto extends PartialType(CreateHobbyDto) {}
