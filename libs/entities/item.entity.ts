import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Service } from './service.entity';
import { Provider } from './provider.entity';

export enum ItemType {
  part = 'part',
  supply = 'supply',
  accessory = 'accessory',
  other = 'other',
}

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Service, (service) => service.items, { nullable: false })
  service: Service;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  quantity: number;

  @Column({ type: 'int' })
  unitPrice: number;

  @ManyToOne(() => Provider, (provider) => provider.items, {
    nullable: true,
  })
  provider?: Provider;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
