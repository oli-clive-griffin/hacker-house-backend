import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from "typeorm"
import { plainToClass } from "class-transformer"
import { User } from "./User"
import { Project } from "./Project"

@Entity()
export class Skill {

  @PrimaryGeneratedColumn()
  id!: string

  @Column()
  label!: string

  @ManyToMany(() => User)
  users!: User

  @ManyToMany(() => Project, project => project.requiredSkills)
  projects: Project[]

  constructor(properties: Partial<Skill>) {
    return plainToClass(Skill, properties)
  }

}
