import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.usersService.delete(+id);
  }

  @Patch(":id/hobbies")
  async addHobbies(
    @Param("id") userId: string,
    @Body("hobbyIds") hobbyIds: number[],
  ) {
    return this.usersService.addHobbiesToUser(+userId, hobbyIds);
  }
}
