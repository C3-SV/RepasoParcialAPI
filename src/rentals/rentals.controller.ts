import { Controller, Post, Get, Param, Body, Put, Delete, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, } from '@nestjs/swagger';
import { RentalsService } from './rentals.service';
import { Rental } from './rental.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('rentals')
@Controller('rentals')
export class RentalsController {
    constructor(private readonly rentalsService: RentalsService) { }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva solicitud de alquiler' })
    @ApiResponse({ status: 201, description: 'Solicitud de alquiler creada correctamente.' })
    createRentalRequest(
        @Param('machineId') machineId: number,
        @Param('startDate') startDate: Date,
        @Param('endDate') endDate: Date
    ): Promise<Rental> {
        return this.rentalsService.createRentalRequest(machineId, startDate, endDate);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Obtener alquileres por usuario' })
    @ApiResponse({ status: 200, description: 'Alquileres obtenidos correctamente.' })
    getRentalsByUser(@Param('userId') userId: number): Promise<Rental[]> {
        return this.rentalsService.getRentalsByUser(userId);
    }
}
