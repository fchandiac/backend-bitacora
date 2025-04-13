import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    OneToMany,
  } from 'typeorm';
  import { Vehicle } from './vehicle.entity';
  import { Provider } from './provider.entity';
  import { Service } from './service.entity';
  import { FuelLoad } from './fuel-load.entity';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    pass: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;

  
    @OneToMany(() => Provider, (provider) => provider.user)
    providers: Provider[];
  
    @OneToMany(() => Service, (service) => service.user)
    services: Service[];
  
    @OneToMany(() => FuelLoad, (fuelLoad) => fuelLoad.user)
    fuelLoads: FuelLoad[];
  }
  