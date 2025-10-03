import {Entity, PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn, BaseEntity} from 'typeorm';
import { Medicine } from './Medicine';
// Assuming you have Category and Supplier entities defined

@Entity('batch')
export class Batch extends BaseEntity {


    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => Medicine)
    @JoinColumn({ name: 'medicine_id' })
    medicine: Medicine;


    @Column()
    batch_number: number;

  @Column({ nullable: true })
expiry_date: string;

@Column({ nullable: true })
stock_quantity: number;












}