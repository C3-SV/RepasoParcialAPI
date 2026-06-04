import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Rental } from '../rentals/rental.entity';
import { User } from '../users/user.entity';

export enum MachineStatus {
  DISPONIBLE = 'disponible',
  RENTADO = 'rentado',
  EN_TALLER = 'en taller',
}

@Entity()
export class Machine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({
    type: 'enum',
    enum: MachineStatus,
    default: MachineStatus.DISPONIBLE,
   })
   available: MachineStatus;

    @ManyToOne(() => User)
    createdBy: User;

    @OneToMany(() => Rental, (rental) => rental.machine)
    rentals: Rental[];
}
