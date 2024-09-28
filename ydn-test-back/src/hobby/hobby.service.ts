import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import { CreateHobbyDto } from "./dto/create-hobby.dto";
import { Repository } from "typeorm";
import { UpdateHobbyDto } from "./dto/update-hobby.dto";
import { Hobby } from "./entities/hobby.entity";

@Injectable()
export class HobbyService {
  constructor(
    @Inject("HOBBY_REPOSITORY")
    private hobbyRepository: Repository<Hobby>,
  ) {}
  async create(createHobbyDto: CreateHobbyDto): Promise<Hobby> {
    const newHobby = this.hobbyRepository.create(createHobbyDto);

    return this.hobbyRepository.save(newHobby);
  }

  async findAll(): Promise<Hobby[]> {
    return this.hobbyRepository.find();
  }

  async findOne(id: number): Promise<Hobby> {
    const hobby = await this.hobbyRepository.findOne({ where: { id } });

    if (!hobby) {
      throw new NotFoundException(`Hobby with ID ${id} not found`);
    }

    return hobby;
  }

  async update(id: number, updateHobbyDto: UpdateHobbyDto): Promise<Hobby> {
    const hobbyToUpdate = await this.hobbyRepository.findOne({ where: { id } });

    if (!hobbyToUpdate) {
      throw new NotFoundException(`Hobby with ID ${id} not found`);
    }

    Object.assign(hobbyToUpdate, updateHobbyDto);

    return this.hobbyRepository.save(hobbyToUpdate);
  }

  async delete(id: number): Promise<string> {
    const hobbyToDelete = await this.hobbyRepository.findOne({ where: { id } });

    if (!hobbyToDelete) {
      throw new NotFoundException(`Hobby with ID ${id} not found`);
    }

    await this.hobbyRepository.delete(id);

    return `Hobby with ID ${id} deleted`;
  }
}
