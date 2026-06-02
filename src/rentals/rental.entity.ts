import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class RentalRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    machineId: number;

    @Column()
    userId: number;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    status: string;
}
