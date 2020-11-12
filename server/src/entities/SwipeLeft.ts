import { BaseEntity, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'
@Entity()
export class SwipeLeft extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(type => User)
  @JoinColumn()
  swipedLeftBy: User

  @OneToOne(type => User)
  @JoinColumn()
  swipedLeftOn: User
}
