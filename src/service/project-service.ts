import { RequestHandler } from "express"
import { In, Repository } from "typeorm"
import { NewProject, Project } from "../entity/Project"

export const makeCreateProject = (projectRepository: Repository<Project>): RequestHandler => async (req, res) => {
  const _newProject = req.body as NewProject

  try {
    const _project = new Project(_newProject)
    const saved = await projectRepository.save(_project)
    console.log(saved)
    res.status(201).json(saved)
  } catch (e) {
    console.log(e)
    res.json({ error: 'something went wrong' })
  }
}

export const makeGetProjects = (projectRepository: Repository<Project>): RequestHandler => async (req, res) => {
  try {
    const projects = await projectRepository.find({ relations: ['tags'] })
    // console.log(projects)
    res.status(200).json(projects)
  } catch (e) {
    console.log(e)
    res.json({ error: 'something went wrong' })
  }
}

export const makeDeleteProject = (projectRepository: Repository<Project>): RequestHandler => async (req, res) => {
  try {
    const project = await projectRepository.findOne({ where: { id: req.params.id }})
    projectRepository.delete({ id: project.id })
    res.status(200).json(project)
  } catch (e) {
    console.log(e)
    res.json({ error: 'something went wrong' })
  }
}

export const makeDeleteAll = (projectRepository: Repository<Project>): RequestHandler => async (_, res) => {
  const allIds = (await projectRepository.find()).map(item => item.id)
  console.log({ allIds })
  await projectRepository.delete({ id: In(allIds) })
  res.status(201).send(`deleted ${allIds.length} items`)
}
