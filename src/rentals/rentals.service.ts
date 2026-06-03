import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental } from './rental.entity';

@Injectable()
export class RentalsService {
    constructor(
        @InjectRepository(Rental)
        private rentalsRepository: Repository<Rental>,
    ) { }

    async createRentalRequest(userId: number, machineId: number, startDate: Date, endDate: Date): Promise<Rental> {
        const nuevo = this.rentalsRepository.create({
            user: { id: userId },
            machine: { id: machineId },
            startDate,
            endDate,
            status: 'pending',
        });
        return this.rentalsRepository.save(nuevo);
    }

    async getRentalsByUser(userId: number): Promise<Rental[]> {
        return this.rentalsRepository.find({ where: { user: { id: userId } } });
    }

    // falta aprobar rentals para admin
}
