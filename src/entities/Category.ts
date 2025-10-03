import {Entity, PrimaryGeneratedColumn,Column,OneToMany,ManyToOne,JoinColumn, BaseEntity} from 'typeorm';
import { Medicine } from './Medicine';

// Assuming you have Category and Supplier entities defined

@Entity('category')
export class Category extends BaseEntity{

 @PrimaryGeneratedColumn()
  id: number;

  @Column()
   name: string;


@OneToMany(() => Medicine, (medicine) => medicine.category)
    medicines: Medicine[]




}