import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { User as GraphqlUser, UserType } from '../graphql/schema.types'
//some of the
@Entity()
export class User extends BaseEntity implements GraphqlUser {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
    length: 100,
  })
  email: string

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.User,
  })
  userType: UserType

  @Column({
    length: 100,
    nullable: true,
  })
  name: string

  @Column({
    length: 100,
    nullable: false,
  })
  dogName: string

  @Column()
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
  Bio: string

  @Column({
    length: 100,
    nullable: false,
  })
  imageURL: string

  @Column()
  dogIsMale: boolean

  //only matters when male
  @Column()
  dogIsCastrated: boolean
}
