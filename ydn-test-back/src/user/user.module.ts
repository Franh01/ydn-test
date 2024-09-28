import { DatabaseModule } from "../database/database.module";
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { hobbyProviders } from "src/hobby/entities/hobby.provider";
import { userProviders } from "./entities/user.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, ...hobbyProviders, UserService],
})
export class UserModule {}
