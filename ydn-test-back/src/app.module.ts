import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { HobbyModule } from "./hobby/hobby.module";
import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot(), UserModule, HobbyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
