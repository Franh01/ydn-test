import { DataSource } from "typeorm";
import { Hobby } from "./hobby.entity";

export const hobbyProviders = [
  {
    provide: "HOBBY_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Hobby),
    inject: ["DATA_SOURCE"],
  },
];
