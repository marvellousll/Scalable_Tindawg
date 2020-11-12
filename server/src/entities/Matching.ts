import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'
@Entity()
export class Matching extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => User)
  user1: User

  @ManyToOne(type => User)
  user2: User
}
