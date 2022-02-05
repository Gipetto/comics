/// <reference types="svelte" />

type Role = {
  id: number
  name: string
}

type UserSession = {
  id: number
  username: string
  email: string
}

type LoginResponse = UserSession | Error
