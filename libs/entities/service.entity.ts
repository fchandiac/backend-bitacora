import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Provider } from './provider.entity';
import { User } from './user.entity';
import { Item } from './item.entity';

export enum ServiceType {
  MAINTENANCE = 'maintenance',
  REPAIR = 'repair',
}

export enum ExecutionType {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
}

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.services)
  vehicle: Vehicle;

  @Column()
  mileage: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: ServiceType })
  type: ServiceType;

  @Column({ type: 'enum', enum: ExecutionType })
  performedBy: ExecutionType;

  @ManyToOne(() => Provider, (provider) => provider.services, {
    nullable: true,
  })
  provider?: Provider;

  @Column({ type: 'int', nullable: true })
  cost?: number;

  @ManyToOne(() => User, (user) => user.services)
  user: User;

  @ManyToOne(() => User, { nullable: true })
  updatedBy?: User;

  @OneToMany(() => Item, (item) => item.service, { cascade: true })
  items: Item[];

  @CreateDateColumn()
  date: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
