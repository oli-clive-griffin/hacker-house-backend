import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from "typeorm"
import { Exclude, plainToClass } from "class-transformer"
import { User } from "./User"

@Entity()
export class Skill {

  @PrimaryGeneratedColumn()
  id!: string

  @Column()
  label!: string

  @ManyToMany(() => User)
  @JoinTable()
  users!: User

  constructor(properties: Partial<Skill>) {
    return plainToClass(Skill, properties)
  }

}
