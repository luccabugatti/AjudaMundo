import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class ActivityEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  activityId: number

  @Column()
  name: string

  @Column()
  points: number

  @Column({ nullable: true })
  description: string

  @Column({ name: 'main_img', nullable: true })
  mainImg: string

  @Column({ default: 0 })
  status: number

  @Column({ name: 'ong_id' })
  ongId: number

  @Column({ name: 'user_id', nullable: true })
  userId: number

  @Column({ name: 'realization_field', nullable: true })
  realizationField: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
