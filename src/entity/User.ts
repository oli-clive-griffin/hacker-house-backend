import { plainToClass } from "class-transformer"
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { Project } from "./Project"
import { Skill } from "./Skill"

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id!: string

  @Column()
  firstName!: string

  @Column()
  lastName!: string

  @ManyToMany(() => Skill, skill => skill.users)
  @JoinTable()
  skills!: Skill[]

  @ManyToMany(() => Project, project => project.participants)
  projects!: Project[]

  constructor(properties: Partial<User>) {
    return plainToClass(User, properties)
  }

}
