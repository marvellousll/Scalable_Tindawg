import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'
@Entity()
export class SwipeRight extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => User)
  swipedRightBy: User

  @ManyToOne(type => User)
  swipedRightOn: User
}
