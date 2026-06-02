import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async createUser(name: string, email: string): Promise<User> {
        const nuevo = this.usersRepository.create({ name, email });
        return this.usersRepository.save(nuevo);
    }
}
