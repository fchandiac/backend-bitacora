import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Provider } from './provider.entity';
import { User } from './user.entity';

@Entity()
export class FuelLoad {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.fuelLoads)
  vehicle: Vehicle;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Provider, (provider) => provider.fuelLoads)
  provider: Provider;

  @Column()
  invoiceNumber: string;

  @Column({ type: 'float' })
  liters: number;

  @Column({ type: 'int' })
  totalPrice: number;

  @ManyToOne(() => User, (user) => user.fuelLoads)
  user: User;

  @DeleteDateColumn()
  deletedAt?: Date; // 👉 Esto habilita el soft delete
}
