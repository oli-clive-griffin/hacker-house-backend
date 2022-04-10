import { RequestHandler } from "express";
import { User } from "../entity/User";
import { compare, compareSync, hashSync } from 'bcrypt'
import { Repository } from "typeorm";
import Jwt from "jsonwebtoken";
import { config } from "./config-service";

const SALT_ROUNDS = 10

export type SignUpDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
}

export const makeSignUp = (userRepository: Repository<User>): RequestHandler => async (req, res) => {
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      passwordHash: hashSync(req.body.password, SALT_ROUNDS),
    })

    const { id, email, firstName, lastName } = await userRepository.save(user)

    const token = Jwt.sign( { id }, config.JWT_SECRET, {
      expiresIn: 86400,
    })
    res.json({ token, email, firstName, lastName })
  } catch(error) {
    console.log(error)
    res.status(400).json({ error })
  }
}

export type SignInDTO = {
  email: string;
  password: string;
}

export const makeLogIn = (userRepository: Repository<User>): RequestHandler => async (req, res) => {
  try {
    const user = await userRepository.findOne({ where: { email: req.body.email }})
    if (!compareSync(req.body.password, user.passwordHash)) throw new Error('incorrect password')

    const token = Jwt.sign( { id: user.id }, config.JWT_SECRET, {
      expiresIn: 86400,
    })
    res.json({ token })
  } catch(error) {
    console.log(error)
    res.status(400).json({ error: (error as Error).message })
  }
}