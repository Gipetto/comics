import { writable } from "svelte/store"

// Session
const defaultSession: UserSession = {
  id: undefined,
  username: undefined,
  email: undefined
}

const sessionStore = writable<UserSession>(defaultSession)

;(async () => {
  fetch("/v1/user")
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        return defaultSession
      }
    })
    .then((sessionData) => sessionStore.set(sessionData))
})()

// Url State
import { globalHistory } from "svelte-routing/src/history"

const pathStore = writable<string>(window.location.pathname)

globalHistory.listen((history) => {
  pathStore.set(history.location.pathname)
})

export { sessionStore, defaultSession, pathStore }
