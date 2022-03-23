import axios from "axios"
import { RequestHandler } from "express"
import { In } from "typeorm"
import { isDataView } from "util/types"
import { AppDataSource } from "../data-source"
import { NewProject, Project } from "../entity/Project"

AppDataSource.initialize()
  .then(() => console.log("Data Source has been initialized!"))
  .catch((err) => console.error("Error during Data Source initialization:", err))

const projectRepository = AppDataSource.getRepository(Project)

export const createProject: RequestHandler = async (req, res) => {
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

export const getProjects: RequestHandler = async (req, res) => {
  try {
    const projects = await projectRepository.find({ relations: ['tags'] })
    // console.log(projects)
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

export const deleteAll: RequestHandler = async (_, res) => {
  const allIds = (await projectRepository.find()).map(item => item.id)
  console.log({ allIds })
  await projectRepository.delete({ id: In(allIds) })
  res.status(201).send(`deleted ${allIds.length} items`)
}

export const authGithub: RequestHandler = async (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  if (clientId == null || clientSecret == null) throw new Error('not coorect env vars')

  try {
    const axiosRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: clientId,
        client_secret: clientSecret,
        code: req.query.code
      },
      {
        headers: {
          Accept: "application/json"
        }
      }
    )

    if (axiosRes.data.error) throw Error(axiosRes.data.error)
    console.log(axiosRes.data)
    
    res.json(axiosRes.data)

  } catch (e) {
    console.log(e)
    res.status(401).send('problem')
  }
};

export const getRepos: RequestHandler = async (req, res) => {
  const accessCode = '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'
}


