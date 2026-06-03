import {
  Controller,
  Post,
  Get,
  Body,
} from '@nestjs/common';
import { MachinesService } from './machines.service';
import { Machine } from './machine.entity';

@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @Post()
  create(@Body() body: { name: string, description: string, available: string, createdBy:string }): Promise<Machine> {
    return this.machinesService.createMachine(body.name, body.description, body.available, body.createdBy);
  }

  @Get()
  findAll(): Promise<Machine[]> {
    return this.machinesService.findAll();
  }
}