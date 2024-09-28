import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { User } from "../../user/entities/user.entity";

@Entity()
export class Hobby {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.hobbies)
  users: User[];
}
