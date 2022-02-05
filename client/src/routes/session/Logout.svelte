<script lang="ts">
import { sessionStore, defaultSession } from "../../stores/session"
import { maybeRedirect } from "../../helpers/routing";

fetch("/v1/logout").then((response) => response.text())
  .then(() => {
    sessionStore.set(defaultSession)
    maybeRedirect("/")
  })
</script>