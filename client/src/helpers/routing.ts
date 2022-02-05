import { navigate } from "svelte-routing"

export const maybeRedirect = (defaultRedirect = undefined) => {
  const redirectLocation =
    new URLSearchParams(window.location.search).get("g") || defaultRedirect
  if (redirectLocation) {
    navigate(redirectLocation)
  }
}
