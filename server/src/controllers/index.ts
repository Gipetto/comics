import type { Express } from "express-serve-static-core"
import type { User } from "../types"
import express from "express"
import * as path from "path"
import { config } from "../config"
import { createProxyMiddleware } from "http-proxy-middleware"
import logger from "../log"
import { userService } from "../services"

// @TODO - get this out in to a declaration file
declare global {
  namespace Express {
    export interface Request {
      user: User
    }
  }
}

const authorization = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.cookies.access_token
  if (!token) {
    return res.sendStatus(403)
  }

  try {
    const verifiedUser = await userService.verifySession(token)
    req.user = verifiedUser
  } catch {
    return res.sendStatus(403)
  }

  next()
}

const controllers = (server: Express) => {
  server.post(
    "/v1/register",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const { username, email, password } = req.body

      // @todo - proper validation
      if (!username || !email || !password) {
        return res.status(400).send({
          error: 400,
          message: "Missing required input"
        })
      }

      const existingUser = await userService.findUser(email)
      if (existingUser) {
        return res.status(409).send({
          error: 409,
          message: `User ${email} already exists`
        })
      }

      const newUser = await userService.addUser({
        username,
        email,
        password
      })

      const token = userService.createSession(newUser)

      return res
        .status(201)
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production"
        })
        .send({
          id: newUser.id,
          username: newUser.username
        })
    }
  )

  server.post(
    "/v1/login",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const { email, password } = req.body

      // // @TODO - proper validation
      if (!email || !password) {
        return res.status(400).send({
          error: 400,
          message: "username and password fields are required"
        })
      }

      const user = await userService.findUser(email)

      if (user && (await userService.validatePassword(user, password))) {
        const token = userService.createSession(user)
        res
          .status(200)
          .cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
          })
          .send({
            id: user.id,
            username: user.username
          })
      } else {
        res.status(401).send({
          error: 401,
          message: "access denied"
        })
      }
    }
  )

  server.get(
    "/v1/logout",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.clearCookie("access_token").sendStatus(200)
    }
  )

  server.get(
    "/v1/user",
    authorization,
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const { id, username, email } = req.user
      return res.status(200).send({ id, username, email })
    }
  )

  if (config.currentEnv !== "production") {
    /**
     * For dev and testing we proxy over to the running svelte dev server
     */
    server.use(
      ["/favicon.png", "/global.css", "/build", "/icons/*"],
      createProxyMiddleware({
        target: "http://localhost:5000",
        changeOrigin: true
      })
    )
  } else {
    /**
     * in the docker container the compiled svelte app is copied in ./public
     */
    server.use(express.static(config.static.dir))
  }

  server.get(
    "*",
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      logger.info(`Handling default route for ${req.url}`)
      res.sendFile("views/index.html", {
        root: path.join(__dirname, "../")
      })
    }
  )
}

export default controllers
