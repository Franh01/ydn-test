import { IHobby } from "./Hobby.interface";

export interface IUser {
  id: number;
  name: string;
  hobbies: IHobby[];
}
