import UserService from "./userservice"
import { db } from "../database"

const userService = new UserService(db)

export { userService }
