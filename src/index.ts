import express from 'express'
import cors from 'cors'
import { json } from 'body-parser'
import "reflect-metadata";
import { makeCreateProject, makeDeleteAll, makeDeleteProject, makeGetProjects } from './service/project-service';
import { authGithub } from './service/oauth-service';
import dotenv from 'dotenv'
import { AppDataSource } from './data-source';
import { Project } from './entity/Project';

dotenv.config()

const PORT = process.env.PORT || 5000

AppDataSource.initialize()
  .then(() => console.log("Data Source has been initialized!"))
  .catch((err) => console.error("Error during Data Source initialization:", err))

const projectRepository = AppDataSource.getRepository(Project)

const main = async () => {
  const app = express()
  app.use(cors())
  app.use(json())

  app.get('/api/projects', makeGetProjects(projectRepository))
  app.post('/api/projects', makeCreateProject(projectRepository))
  app.delete('/api/projects/all', makeDeleteAll(projectRepository))
  app.delete('/api/projects/:id', makeDeleteProject(projectRepository))

  app.get('/auth/github', authGithub)

  app.listen(PORT, () => {
    console.log(`\n\n\n-- listening on port ${PORT} --`)
  })

}

main()
