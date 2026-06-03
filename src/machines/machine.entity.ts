import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Rental } from '../rentals/rental.entity';
import { User } from '../users/user.entity';

@Entity()
export class Machine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    status: string;

    @ManyToOne(() => User)
    createdBy: User;

    @OneToMany(() => Rental, (rental) => rental.machine)
    rentals: Rental[];
}
