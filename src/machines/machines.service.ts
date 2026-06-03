import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Machine } from './machine.entity';
import { MachineStatus } from './machine.entity';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine)
    private machinesRepository: Repository<Machine>,
  ) {}

  async createMachine(name: string, description: string, available: string, createdBy:string): Promise<Machine> {
    const nueva = this.machinesRepository.create({ name,  });
    return this.machinesRepository.save(nueva);
  }

  async findAll(): Promise<Machine[]> {
    return this.machinesRepository.find();
  }

}