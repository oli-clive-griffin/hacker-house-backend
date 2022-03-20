import "reflect-metadata"
import { DataSource } from "typeorm"
import { Project } from "./entity/Project"
import { Skill } from "./entity/Skill"
import { Tag } from "./entity/Tag"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  database: "oliclive-griffin",
  username: "oliclive-griffin",
  password: "",
  synchronize: true,
  logging: true,
  entities: [User, Project, Skill, Tag],
  migrations: [],
  subscribers: [],
})
