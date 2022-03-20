import { Exclude, plainToClass } from "class-transformer"
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { Project } from "./Project"

export type NewTag = { label: string }

@Entity()
export class Tag {

  @PrimaryGeneratedColumn()
  @Exclude()
  id!: string

  @Column()
  label!: string

  @ManyToMany(() => Project)
  @JoinTable()
  @Exclude()
  projects!: Project[]

  constructor(properties: NewTag) {
    return plainToClass(Tag, properties)
  }

}
