import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Machine } from 'src/machines/machine.entity';

@Entity()
export class Rental {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.rentals)
    user: User;

    @ManyToOne(() => Machine, (machine) => machine.rentals)
    machine: Machine;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    status: string;

}
