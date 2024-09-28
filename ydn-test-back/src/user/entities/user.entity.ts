import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Hobby } from "../../hobby/entities/hobby.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Hobby, (hobby) => hobby.users)
  @JoinTable()
  hobbies: Hobby[];
}
