import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity } from "typeorm"
import { plainToInstance } from 'class-transformer'
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

  @ManyToMany(() => Skill, skill => skill.projects, { cascade: true})
  @JoinTable()
  requiredSkills!: Skill[]

  @ManyToMany(() => User, user => user.projects, { cascade: true})
  @JoinTable()
  participants!: User[]

  @ManyToMany(() => Tag, tag => tag.projects, { cascade: true })
  @JoinTable()
  tags!: Tag[]

  constructor(properties: NewProject) {
    return plainToInstance(Project, properties)
  }

}
