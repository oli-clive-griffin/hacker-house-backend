import { plainToInstance } from "class-transformer"
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { Project } from "./Project"
import { Skill } from "./Skill"

export type NewUser = Partial<User> & Pick<User, 'email' | 'passwordHash'>

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id!: string

  @Column()
  firstName!: string

  @Column({ nullable: true })
  lastName?: string

  @Column()
  email!: string

  @Column()
  passwordHash!: string

  @ManyToMany(() => Skill, skill => skill.users)
  @JoinTable()
  skills!: Skill[]

  @ManyToMany(() => Project, project => project.participants)
  projects!: Project[]

  constructor(properties: NewUser) {
    return plainToInstance(User, properties)
  }

}
