import { BaseEntity, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'
@Entity()
export class Matching extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(type => User)
  @JoinColumn()
  user1: User

  @OneToOne(type => User)
  @JoinColumn()
  user2: User
}
