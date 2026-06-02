// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { Rental } from './rental.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Rental])],
    providers: [RentalsService],
    controllers: [RentalsController],
    exports: [TypeOrmModule],
})
export class RentalsModule { }

//nest generate service users