import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor (
        private jwtService: JwtService,
        private usersService: UsersService,
    ) { }

    async validateUser (email: string, password: string) {

        const user = await this.usersService.findByEmail(email);

        if (!user || user.password !== password) {
            return null;
        }

        const { password: _password, ...validatedUser } = user;

        return validatedUser;

    }

    login (user: any) {

        const payload = { email: user.email, sub: user.id };

        return {
            
            access_token: this.jwtService.sign(payload),

        };

    }

}
