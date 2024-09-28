import { AxiosError } from "axios";
import { IHobby } from "../interfaces/Hobby.interface";
import httpClient from "../common/httpClient";

export class HobbyService {
  static readonly create = async (name: string): Promise<IHobby> => {
    try {
      const { data } = await httpClient.post(`hobby`, {
        name,
      });

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data);
      }

      throw new Error("Error creating hobby");
    }
  };

  static readonly getAll = async (): Promise<IHobby[]> => {
    try {
      const { data } = await httpClient.get(`hobby`);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data);
      }

      throw new Error("Error getting all hobbies");
    }
  };

  static readonly getById = async (id: number): Promise<IHobby> => {
    try {
      const { data } = await httpClient.get(`hobby/${id}`);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data);
      }

      throw new Error("Error getting hobby by id");
    }
  };

  static readonly update = async (
    id: number,
    name: string
  ): Promise<IHobby> => {
    try {
      const { data } = await httpClient.patch(`hobby/${id}`, {
        name,
      });

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data);
      }

      throw new Error("Error updating hobby");
    }
  };

  static readonly delete = async (id: number): Promise<string> => {
    try {
      const { data } = await httpClient.delete(`hobby/${id}`);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data);
      }

      throw new Error("Error deleting hobby");
    }
  };
}
