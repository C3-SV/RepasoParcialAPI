import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

    @Column()
    createdBy: string;
}
