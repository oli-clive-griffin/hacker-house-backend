import express from 'express'
import cors from 'cors'
import { json } from 'body-parser'
import "reflect-metadata";
import { makeCreateProject, makeDeleteAll, makeDeleteProject, makeGetProjects } from './service/project-service';
import dotenv from 'dotenv'
import { AppDataSource } from './data-source';
import { Project } from './entity/Project';
import { authGithub } from './service/oauth-service';
import { User } from './entity/User';
import { makeLogIn, makeSignUp } from './service/auth-service';
import { config } from './service/config-service';

AppDataSource.initialize()
  .then(() => console.log("Data Source has been initialized!"))
  .catch((err) => console.error("Error during Data Source initialization:", err))

const projectRepository = AppDataSource.getRepository(Project)
const userRepository = AppDataSource.getRepository(User)

const app = express()
app.use(cors())
app.use(json())

// Projects
app.get('/api/projects', makeGetProjects(projectRepository))
app.post('/api/projects', makeCreateProject(projectRepository, userRepository))
app.delete('/api/projects/all', makeDeleteAll(projectRepository))
app.delete('/api/projects/:id', makeDeleteProject(projectRepository))

// Auth
app.post('/api/signup', makeSignUp(userRepository))
app.post('/api/login', makeLogIn(userRepository))

app.get('/auth/github', authGithub)

app.listen(config.PORT, () => {
  console.log(`\n\n\n-- listening on port ${config.PORT} --`)
})
