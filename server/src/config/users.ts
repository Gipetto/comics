export type User = {
  username: string
  password: string
  email: String
  roles: number[]
}

export type Role = {
  id: number
  name: string
}

export type SessionResponse = {
  username: string
  roles: Role[]
}

export const roles: Role[] = [
  {
    id: 1,
    name: "admin",
  },
]

export const users: User[] = [
  {
    username: "Wookiee",
    password: "Password",
    email: "me@here.com",
    roles: [1],
  },
]
