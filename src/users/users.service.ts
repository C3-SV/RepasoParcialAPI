import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

type GoogleUserData = {
    googleId: string;
    email: string;
    name: string;
};

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

    async findOrCreateGoogleUser(googleUser: GoogleUserData): Promise<User> {
        const userByGoogleId = await this.usersRepository.findOne({
            where: { googleId: googleUser.googleId },
        });

        if (userByGoogleId) {
            return userByGoogleId;
        }

        const userByEmail = await this.findByEmail(googleUser.email);

        if (userByEmail) {
            userByEmail.googleId = googleUser.googleId;
            return this.usersRepository.save(userByEmail);
        }

        const nuevo = this.usersRepository.create({
            email: googleUser.email,
            googleId: googleUser.googleId,
            name: googleUser.name,
            password: null,
            role: 'user',
        });

        return this.usersRepository.save(nuevo);
    }
}
