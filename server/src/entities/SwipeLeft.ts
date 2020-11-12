import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'
@Entity()
export class SwipeLeft extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => User)
  swipedLeftBy: User

  @ManyToOne(type => User)
  swipedLeftOn: User
}
