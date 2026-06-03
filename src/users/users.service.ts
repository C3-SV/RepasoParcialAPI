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

    async createUser(name: string, email: string, password: string, role: string): Promise<User> {
        if(role !== 'admin' && role !== 'user') {
            throw new NotFoundException('Role debe ser admin or user');
        }
        const nuevo = this.usersRepository.create({ name, email, password, role });
        return this.usersRepository.save(nuevo);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
    }
}
