import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { HobbyService } from "./hobby.service";
import { CreateHobbyDto } from "./dto/create-hobby.dto";
import { UpdateHobbyDto } from "./dto/update-hobby.dto";

@Controller("hobby")
export class HobbyController {
  constructor(private readonly hobbyService: HobbyService) {}

  @Post()
  create(@Body() createHobbyDto: CreateHobbyDto) {
    return this.hobbyService.create(createHobbyDto);
  }

  @Get()
  findAll() {
    return this.hobbyService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.hobbyService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateHobbyDto: UpdateHobbyDto) {
    return this.hobbyService.update(+id, updateHobbyDto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.hobbyService.delete(+id);
  }
}
