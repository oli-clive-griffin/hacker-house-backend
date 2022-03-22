import { plainToClass } from "class-transformer"
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import { Project } from "./Project"

export type NewTag = { label: string }

@Entity()
export class Tag {

  @PrimaryGeneratedColumn()
  id!: string

  @Column()
  label!: string

  @ManyToMany(() => Project, project => project.tags)
  projects: Project[]

  constructor(properties: NewTag) {
    return plainToClass(Tag, properties)
  }

}
