<script lang="ts">
    import { goto } from "$app/navigation";
    import { isAdmin, player } from "$lib/api/api";

    $: {
        if (!isAdmin($player)) {
            goto("/");
        }
    }
</script>

<!-- Require admin authentication to view pages in the admin scope -->
{#if isAdmin($player)}
    <slot />
{:else}
    <p class="error">Not Authorized</p>
{/if}
