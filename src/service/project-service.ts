import { RequestHandler } from "express"
import { In, Repository } from "typeorm"
import { NewProject, Project } from "../entity/Project"
import { Tag } from "../entity/Tag"
import { User } from "../entity/User"

type CreateProjectDTO = {
  title: string
  description: string
  tags: string[]
  participantIds: string[]
}

export const makeCreateProject = (
  projectRepository: Repository<Project>,
  userRepository: Repository<User>,
): RequestHandler => async (req, res) => {
  const createProjectDto = req.body as CreateProjectDTO
  const users = await userRepository.find({ where: { id: In(createProjectDto.participantIds) } })

  const newProjectProps: NewProject = {
    ...createProjectDto,
    participants: users,
    requiredSkills: [],
    tags: createProjectDto.tags.map(label => new Tag({ label })),
  }

  try {
    const project = new Project(newProjectProps)
    const saved = await projectRepository.save(project)
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
