import {Entity, PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn, OneToMany, BaseEntity} from 'typeorm';

// Assuming you have Category and Supplier entities defined
import { Category } from './Category';
import { Supplier } from './Supplier';
import { Batch } from './Batch';

@Entity('medicine')
export class Medicine extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Supplier)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Batch, (batch) => batch.medicine)
    batches: Batch[]
}