import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    DeleteDateColumn,
    OneToMany,
  } from 'typeorm';
  import { User } from './user.entity';
  import { Service } from './service.entity';
  import { FuelLoad } from './fuel-load.entity';
  
  @Entity()
  export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    plate: string;
  
    @Column()
    engineNumber: string;
  
    @Column()
    brand: string;
  
    @Column()
    model: string;
  
    @Column()
    year: number;
  
    @Column()
    name: string;
  
    @Column({ nullable: true })
    notes: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @OneToMany(() => Service, (service) => service.vehicle)
    services: Service[];
  
    @OneToMany(() => FuelLoad, (fuelLoad) => fuelLoad.vehicle)
    fuelLoads: FuelLoad[];
  }
  