import type { Knex } from "knex"
import type { User, UserCreate, UserSession } from "../types"

import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { config } from "../config"

export default class UserService {
  readonly db: Knex

  constructor(db: Knex) {
    this.db = db
  }

  async findUser(email: String): Promise<User> {
    return await this.db("users").where("email", email).first()
  }

  async fetchUser(userId: number): Promise<User> {
    return await this.db("users").where("id", userId).first()
  }

  async addUser(user: UserCreate): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10)

    return await this.db("users")
      .insert(user)
      .returning("id")
      .then((rows) => {
        if (!rows) {
          throw new Error(`Unable to insert user`)
        }
        return this.fetchUser(rows[0])
      })
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password)
  }

  createSession(user: User): string {
    const data = {
      id: user.id,
      username: user.username
    }
    return jwt.sign(data, config.jwt.token_key, config.jwt.options)
  }

  async verifySession(token: string): Promise<User> {
    const data = jwt.verify(token, config.jwt.token_key, {}) as UserSession
    return this.fetchUser(data.id)
  }
}
