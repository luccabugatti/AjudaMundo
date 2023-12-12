import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ name: 'profile_img', nullable: true })
  profileImg: string

  @Column({ name: 'points_score', nullable: true })
  pointsScore: number

  @Column({ name: 'activities_ids', nullable: true })
  activitiesIds: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
