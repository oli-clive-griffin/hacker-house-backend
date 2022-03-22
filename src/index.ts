import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import "reflect-metadata";
import { createProject, deleteAll, deleteProject, getProjects } from './service/project-service';

const PORT = process.env.PORT || 5000

const main = async () => {
  const app = express()
  app.use(cors())
  app.use(bodyParser.json())

  app.get('/api/projects', getProjects)
  app.post('/api/projects', createProject)
  // app.delete('/api/projects/all', deleteAll)
  app.delete('/api/projects/:id', deleteProject)

  app.listen(PORT, () => {
    console.log(`\n\n\n-- listening on port ${PORT} --`)
  })

}

main()
