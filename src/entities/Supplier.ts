import { text } from 'pdfkit';
import {Entity, PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn, OneToMany, BaseEntity} from 'typeorm';
import { Medicine } from './Medicine';

// Assuming you have Category and Supplier entities defined

@Entity('supplier')
export class Supplier extends BaseEntity{


 @PrimaryGeneratedColumn()
  id: number;

  @Column()
   name: string;

   @Column()
   phone: string;

   @Column(
    {type: "text"}
   )
   address: string;

@OneToMany(() => Medicine, (medicine) => medicine.supplier)
    medicines: Medicine[]
}