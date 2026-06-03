import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RentalsService } from './rentals.service';
import { Rental } from './rental.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

type RequestWithUser = {
    user?: {
        id?: number | string;
        sub?: number | string;
        userId?: number | string;
    };
};

@UseGuards(JwtAuthGuard)
@ApiTags('rentals')
@Controller('rentals')
export class RentalsController {
    constructor(private readonly rentalsService: RentalsService) { }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva solicitud de alquiler' })
    @ApiResponse({ status: 201, description: 'Solicitud de alquiler creada correctamente.' })
    createRentalRequest(
        @Req() req: RequestWithUser,
        @Body() body: { machineId: number; startDate: string; endDate: string }
    ): Promise<Rental> {
        const userId = Number(req.user?.id ?? req.user?.sub ?? req.user?.userId);

        return this.rentalsService.createRentalRequest(
            userId,
            body.machineId,
            new Date(body.startDate),
            new Date(body.endDate),
        );
    }

    @Get()
    @ApiOperation({ summary: 'Obtener alquileres por usuario' })
    @ApiResponse({ status: 200, description: 'Alquileres obtenidos correctamente.' })
    getRentalsByUser(@Req() req: RequestWithUser): Promise<Rental[]> {
        const userId = Number(req.user?.id ?? req.user?.sub ?? req.user?.userId);

        return this.rentalsService.getRentalsByUser(userId);
    }
}
