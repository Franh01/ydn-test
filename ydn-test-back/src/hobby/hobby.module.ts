import { DatabaseModule } from "src/database/database.module";
import { HobbyController } from "./hobby.controller";
import { HobbyService } from "./hobby.service";
import { Module } from "@nestjs/common";
import { hobbyProviders } from "./entities/hobby.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [HobbyController],
  providers: [...hobbyProviders, HobbyService],
})
export class HobbyModule {}
