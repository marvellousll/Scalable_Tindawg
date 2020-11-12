import { BaseEntity, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'
@Entity()
export class SwipeRight extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(type => User)
  @JoinColumn()
  swipedRightBy: User

  @OneToOne(type => User)
  @JoinColumn()
  swipedRightOn: User
}
