import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { Repository, In } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Hobby } from "src/hobby/entities/hobby.entity";

@Injectable()
export class UserService {
  constructor(
    @Inject("USER_REPOSITORY")
    private userRepository: Repository<User>,
    @Inject("HOBBY_REPOSITORY")
    private hobbyRepository: Repository<Hobby>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);

    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ["hobbies"] });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.userRepository.findOne({ where: { id } });

    if (!userToUpdate) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    Object.assign(userToUpdate, updateUserDto);

    return this.userRepository.save(userToUpdate);
  }

  async delete(id: number): Promise<string> {
    const userToDelete = await this.userRepository.findOne({ where: { id } });

    if (!userToDelete) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.delete(id);

    return `User with ID ${id} deleted`;
  }

  async addHobbiesToUser(userId: number, hobbyIds: number[]) {
    if (!Array.isArray(hobbyIds) || hobbyIds.length === 0) {
      throw new BadRequestException("No hobby IDs provided");
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (!user.hobbies) {
      user.hobbies = [];
    }

    const hobbies = await this.hobbyRepository.findBy({
      id: In(hobbyIds),
    });

    if (!hobbies.length) {
      throw new NotFoundException("No hobbies found with the given IDs");
    }

    user.hobbies = hobbies;
    return this.userRepository.save(user);
  }
}
