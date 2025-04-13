import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Service } from './service.entity';
import { Item } from './item.entity';
import { FuelLoad } from './fuel-load.entity';


//fuel, maintenance, parts, repair, other

@Entity()
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  identifier: string;

  @Column()
  type: string; // fuel, maintenance, parts, repair, other

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.providers)
  user: User;

  @OneToMany(() => Service, (service) => service.provider)
  services: Service[];

  @OneToMany(() => Item, (item) => item.provider)
  items: Item[];

  @OneToMany(() => FuelLoad, (fuelLoad) => fuelLoad.provider)
  fuelLoads: FuelLoad[];
}
