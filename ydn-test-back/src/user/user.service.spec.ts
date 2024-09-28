import { Test, TestingModule } from "@nestjs/testing";

import { Hobby } from "../hobby/entities/hobby.entity";
import { HobbyService } from "../hobby/hobby.service";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

// Mock de UserRepository
const mockUserRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
};

// Mock de HobbyRepository
const mockHobbyRepository = {
  findBy: jest.fn(),
};

describe("UserService", () => {
  let service: UserService;
  let userRepository: Repository<User>;
  let hobbyRepository: Repository<Hobby>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        HobbyService,
        {
          provide: "USER_REPOSITORY",
          useValue: mockUserRepository, // Usar el mock de UserRepository
        },
        {
          provide: "HOBBY_REPOSITORY",
          useValue: mockHobbyRepository, // Usar el mock de HobbyRepository
        },
      ],
    }).compile();

    service = app.get<UserService>(UserService);
    userRepository = app.get<Repository<User>>("USER_REPOSITORY");
    hobbyRepository = app.get<Repository<Hobby>>("HOBBY_REPOSITORY");
  });

  it("Should associate hobbies to user", async () => {
    const user = { id: 1, name: "Francisco", hobbies: [] } as User;
    const hobby = { id: 1, name: "Leer" } as Hobby;

    // Mockear las respuestas de los métodos
    jest.spyOn(userRepository, "findOne").mockResolvedValue(user);
    jest.spyOn(hobbyRepository, "findBy").mockResolvedValue([hobby]);
    jest.spyOn(userRepository, "save").mockResolvedValue({
      ...user,
      hobbies: [hobby],
    });

    const result = await service.addHobbiesToUser(1, [1]);

    expect(result.hobbies).toContain(hobby);
  });

  it("Should throw error if user is not found", async () => {
    jest.spyOn(userRepository, "findOne").mockResolvedValue(null);

    await expect(service.addHobbiesToUser(1, [1])).rejects.toThrow(
      "User with ID 1 not found",
    );
  });

  it("Should throw error if no hobbies are found", async () => {
    const user = { id: 1, name: "John", hobbies: [] } as User;

    jest.spyOn(userRepository, "findOne").mockResolvedValue(user);
    jest.spyOn(hobbyRepository, "findBy").mockResolvedValue([]);

    await expect(service.addHobbiesToUser(1, [1])).rejects.toThrow(
      "No hobbies found with the given IDs",
    );
  });

  it("Should replace existing hobbies with the provided hobbies", async () => {
    const user = {
      id: 1,
      name: "Francisco",
      hobbies: [{ id: 1, name: "Leer" }],
    } as User;

    const newHobbies = [
      { id: 2, name: "Escribir" },
      { id: 3, name: "Escuchar música" },
    ] as Hobby[];

    jest.spyOn(userRepository, "findOne").mockResolvedValue(user);
    jest.spyOn(hobbyRepository, "findBy").mockResolvedValue(newHobbies);

    await service.addHobbiesToUser(1, [2, 3]);

    expect(user.hobbies).toEqual(newHobbies);
    expect(user.hobbies).not.toContain({ id: 1, name: "Leer" });
  });
});
