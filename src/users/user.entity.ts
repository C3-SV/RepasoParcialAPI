import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rental } from '../rentals/rental.entity';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    role: string;

    @OneToMany(() => Rental, (rental) => rental.user)
    rentals: Rental[];
}
