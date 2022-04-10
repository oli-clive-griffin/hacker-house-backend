import { plainToInstance } from "class-transformer"
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import { Project } from "./Project"

@Entity()
export class Tag {

  @PrimaryGeneratedColumn()
  id!: string

  @Column()
  label!: string

  @ManyToMany(() => Project, project => project.tags)
  projects: Project[]

  constructor(properties: Partial<Tag>) {
    return plainToInstance(Tag, properties)
  }

}
