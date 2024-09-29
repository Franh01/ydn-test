import { AxiosError } from "axios";
import { IHobby } from "../interfaces/Hobby.interface";
import { IUser } from "../interfaces/User.interface";
import httpClient from "../common/httpClient";

export class UserService {
  static readonly create = async (
    name: string,
    hobbies: IHobby[]
  ): Promise<IUser> => {
    try {
      const { data } = await httpClient.post(`user`, {
        name,
      });

      if (hobbies.length > 0) {
        return await this.addHobbies(data.id, hobbies);
      }

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }

      throw new Error("Error creating user");
    }
  };

  static readonly getAll = async (): Promise<IUser[]> => {
    try {
      const { data } = await httpClient.get(`user`);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }

      throw new Error("Error getting all users");
    }
  };

  static readonly getById = async (id: number): Promise<IUser> => {
    try {
      const { data } = await httpClient.get(`user/${id}`);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }

      throw new Error("Error getting user by id");
    }
  };

  static readonly update = async (
    id: number,
    name: string,
    hobbies: IHobby[]
  ): Promise<IUser> => {
    try {
      await httpClient.patch(`user/${id}`, {
        name,
      });

      return await this.addHobbies(id, hobbies);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }

      throw new Error("Error updating user");
    }
  };

  static readonly delete = async (id: number): Promise<string> => {
    try {
      const { data } = await httpClient.delete(`user/${id}`);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }

      throw new Error("Error deleting user");
    }
  };

  static readonly addHobbies = async (
    id: number,
    hobbies: IHobby[]
  ): Promise<IUser> => {
    try {
      const { data } = await httpClient.patch(`user/${id}/hobbies`, {
        hobbyIds: hobbies.map((hobby) => hobby.id),
      });

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }

      throw new Error("Error adding hobbies to user");
    }
  };
}
