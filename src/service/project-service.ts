import { RequestHandler } from "express"
import { AppDataSource } from "../data-source"
import { NewProject, Project } from "../entity/Project"

AppDataSource.initialize()
  .then(() => console.log("Data Source has been initialized!"))
  .catch((err) => console.error("Error during Data Source initialization:", err))

const projectRepository = AppDataSource.getRepository(Project)

export const createProject: RequestHandler = async (req, res) => {
  const _newProject = req.body as NewProject
  console.log(_newProject)

  try {
    const _project = new Project(_newProject)
    const saved = await projectRepository.save(_project)
    res.status(201).json(saved)
  } catch (e) {
    console.log(e)
    res.json({ error: 'something went wrong' })
  }
}

export const getProjects: RequestHandler = async (req, res) => {
  try {
    const projects = await projectRepository.find()
    res.status(200).json(projects)
  } catch (e) {
    console.log(e)
    res.json({ error: 'something went wrong' })
  }
}

export const deleteProject: RequestHandler = async (req, res) => {
  try {
    const project = await projectRepository.findOne({ where: { id: req.params.id }})
    projectRepository.delete({ id: project.id })
    res.status(200).json(project)
  } catch (e) {
    console.log(e)
    res.json({ error: 'something went wrong' })
  }
}

