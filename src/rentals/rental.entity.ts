import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Machine } from 'src/machines/machine.entity';

@Entity()
export class Rental {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    machineId: number;

    @OneToOne(() => User, (user) => user.rentals)
    userId: User;

    @OneToOne(() => Machine, (machine) => machine.rentals)
    machineId: Machine;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    status: string;


}
