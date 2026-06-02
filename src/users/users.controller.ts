import { Controller, Post, Get, Param, Body, Put, Delete, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, } from '@nestjs/swagger';
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
    create(@Param('name') name: string, @Param('email') email: string, @Param('role') role: string): Promise<User> {
        return this.usersService.createUser(name, email, role);
    }
}
