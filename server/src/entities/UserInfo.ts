import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'
@Entity()
export class UserInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(type => User, { eager: true })
  @JoinColumn()
  user: User

  @Column({
    length: 100,
  })
  dogName: string

  @Column({
    default: 0,
  })
  dogAge: number

  @Column({
    length: 100,
  })
  dogBreed: string

  @Column({
    length: 100,
    default: 'Los Angeles',
  })
  location: string

  @Column({
    length: 100,
    nullable: true,
  })
  bio: string

  @Column({
    length: 100,
    nullable: true,
  })
  contact: string

  @Column({
    length: 100,
    nullable: true,
  })
  facebook: string

  @Column({
    length: 100,
    nullable: true,
  })
  linkedin: string

  @Column({
    length: 100,
    nullable: false,
  })
  imageURL: string
}
