import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'
@Entity()
export class UserInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    default: 0,
    nullable: false,
  })
  userId: number

  @OneToOne(type => User, { eager: true })
  @JoinColumn({
    name: 'userId',
  })
  user: User

  @Column({
    length: 100,
    nullable: true,
  })
  dogName: string

  @Column({
    default: 0,
    nullable: true,
  })
  dogAge: number

  @Column({
    length: 100,
    nullable: true,
  })
  dogBreed: string

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
    default: 'Los Angeles',
  })
  location: string

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
    nullable: true,
  })
  image: string
}
