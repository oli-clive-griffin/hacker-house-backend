import express from 'express'
import cors from 'cors'
import { AppDataSource } from "./data-source"
import bodyParser from 'body-parser'
import { Project } from './entity/Project';
import { User } from './entity/User';
import "reflect-metadata";
import getTestData from './load-test-data.script';
import { createProject, deleteProject, getProjects } from './service/project-service';

const PORT = process.env.PORT || 5000

const main = async () => {
  // for (const repo of [ProjectRepo, UsersRepo]) {
  //   const allIds = (await repo.find()).map(item => item.id)
  //   console.log({ allIds })
  //   // await repo.delete({ id: In(allIds) })
  // }

  const app = express()
  app.use(cors())
  app.use(bodyParser.json())

  app.get('/api/projects', getProjects)
  app.post('/api/projects', createProject)
  app.delete('/api/projects/:id', deleteProject)

  app.listen(PORT, () => {
    console.log(`\n\n\n-- listening on port ${PORT} --`)
  })

}

main()
