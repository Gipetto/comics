export * from "./schemas.generated"
export * from "./paginator"

export type User = {
  id: number
  username: string
  email: String
  password: string
}

export type UserCreate = Omit<User, "id">

export type UserSession = Omit<User, "email, password">

export type SessionResponse = {
  username: string
}
