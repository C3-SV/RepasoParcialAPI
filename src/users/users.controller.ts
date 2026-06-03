import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('usuarios')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    
    @Post()
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado correctamente.' })
    create(@Body() body: { name: string; email: string; password: string; role: string }): Promise<User> {
        return this.usersService.createUser(body.name, body.email, body.password, body.role);
    }
}
