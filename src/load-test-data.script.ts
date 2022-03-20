import { Project } from "./entity/Project"
import { User } from "./entity/User"

const getTestData: () => { projects: Project[], users: User[] } = () => {
  const Oli = new User({ firstName: 'Oli', lastName: 'Clive-Griffin', skills: [] })
  const Gallagher = new User({ firstName: 'Gallagher', lastName: 'Houlbrooke', skills: [] })
  const Jurgen = new User({ firstName: 'Jurgen', lastName: 'Schwanecke', skills: [] })
  const Annie = new User({ firstName: 'Annie', lastName: 'Barnard', skills: [] })
  const Grace = new User({ firstName: 'Grace', lastName: 'Hughes', skills: [] })

  const users = [Oli, Gallagher, Annie, Jurgen, Grace]

  const projects = [
    new Project({
    "title": 'SICP',
    "description": "we're going through the classic MIT textbook to become master wizard hackers",
    "participants": [Oli, Gallagher],
    "tags": [],
    "requiredSkills": []
    }),
    new Project({
      "title": 'React todos',
      "description": "we're building a react todo app",
      "participants": [],
      "tags": [],
      "requiredSkills": []
    }),
    new Project({
      "title": 'Decentralised chat app',
      "description": "we're building a decentralised chat app on solana",
      "participants": [Jurgen, Grace],
      "tags": [],
      "requiredSkills": []
    }),
  ]

  return { projects, users }
}

export default getTestData

// const productManager = new Role({ title: 'product manager', user: Annie })
// const backend = new Role({ title: 'backend engineer', user: Gallagher })
// const frontend = new Role({ title: 'frontend engineer', user: Oli })
// const designer = new Role({ title: 'designer', user: Grace })
// const ceo = new Role({ title: 'CEO', user: Jurgen })
// const roles = [productManager, backend, frontend, ceo, designer]