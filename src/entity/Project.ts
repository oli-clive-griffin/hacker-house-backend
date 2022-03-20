import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity } from "typeorm"
import { plainToClass } from 'class-transformer'
import { User } from "./User"
import { Tag } from "./Tag"
import { Skill } from "./Skill"

export type NewProject = Omit<Project, 'id'>

@Entity()
export class Project {

  @PrimaryGeneratedColumn()
  id!: string

  @Column()
  title!: string

  @Column()
  description!: string

  @ManyToMany(() => Skill, { cascade: true})
  @JoinTable()
  requiredSkills!: Skill[]

  @ManyToMany(() => User, { cascade: true})
  @JoinTable()
  participants!: User[]

  @ManyToMany(() => Tag, { cascade: true})
  @JoinTable()
  tags!: Tag[]

  constructor(properties: NewProject) {
    return plainToClass(Project, properties)
  }

}
