<script lang="ts">
import { sessionStore } from "../stores/session"
import Login from "../routes/session/Login.svelte"
</script>

{#if !$sessionStore.username}
<Login/>
{:else}
<slot></slot>
{/if}