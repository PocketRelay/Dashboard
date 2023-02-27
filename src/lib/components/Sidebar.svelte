<script lang="ts">
    import Home from "svelte-material-icons/Home.svelte";
    import Settings from "svelte-material-icons/Cog.svelte";
    import List from "svelte-material-icons/FormatListNumbered.svelte";
    import Inventory from "svelte-material-icons/Cube.svelte";
    import Classes from "svelte-material-icons/AccountGroup.svelte";
    import AccountMultiple from "svelte-material-icons/AccountMultiple.svelte";
    import Games from "svelte-material-icons/Controller.svelte";
    import Logs from "svelte-material-icons/TextBoxMultiple.svelte";
    import Logout from "svelte-material-icons/LogoutVariant.svelte";
    import { clearToken, player } from "$lib/api/api";
    import { PlayerRole } from "$lib/api/players";

    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    let expanded: boolean = false;

    async function logout() {
        clearToken();
        await goto("/login");
    }
</script>

<aside class="sidebar">
    <nav class="sidebar__group">
        <a
            class="sidebar-button"
            href="/"
            class:sidebar-button--selected={$page.route.id == "/(dashboard)"}
        >
            <Home class="sidebar-button__icon" />
            <span class="sidebar-button__text">Home</span>
        </a>
        <a
            class="sidebar-button"
            href="/leaderboard"
            class:sidebar-button--selected={$page.route.id ==
                "/(dashboard)/leaderboard"}
        >
            <List class="sidebar-button__icon" />
            <span class="sidebar-button__text">Leaderboard</span>
        </a>
        <a
            class="sidebar-button"
            href="/inventory"
            class:sidebar-button--selected={$page.route.id ==
                "/(dashboard)/inventory"}
        >
            <Inventory class="sidebar-button__icon" />
            <span class="sidebar-button__text">Inventory</span>
        </a>
        <a
            class="sidebar-button"
            href="/classes"
            class:sidebar-button--selected={$page.route.id ==
                "/(dashboard)/classes"}
        >
            <Classes class="sidebar-button__icon" />
            <span class="sidebar-button__text">Classes</span>
        </a>
        <a
            class="sidebar-button"
            href="/games"
            class:sidebar-button--selected={$page.route.id ==
                "/(dashboard)/games"}
        >
            <Games class="sidebar-button__icon" />
            <span class="sidebar-button__text">Games</span>
        </a>

        {#if $player.role == PlayerRole.Admin || $player.role == PlayerRole.SuperAdmin}
            <div class="admin-group">
                <span class="admin-group__title">Admin</span>
                <div class="sidebar__group admin-group__content">
                    <a
                        class="sidebar-button"
                        href="/players"
                        class:sidebar-button--selected={$page.route.id ==
                            "/(dashboard)/players"}
                    >
                        <AccountMultiple class="sidebar-button__icon" />
                        <span class="sidebar-button__text">Players</span>
                    </a>

                    {#if $player.role == PlayerRole.SuperAdmin}
                        <a
                            class="sidebar-button"
                            href="/logs"
                            class:sidebar-button--selected={$page.route.id ==
                                "/(dashboard)/logs"}
                        >
                            <Logs class="sidebar-button__icon" />
                            <span class="sidebar-button__text">Logs</span>
                        </a>
                    {/if}
                </div>
            </div>
        {/if}
    </nav>

    <div class="sidebar__group">
        <a
            class="sidebar-button"
            href="/settings"
            class:sidebar-button--selected={$page.route.id ==
                "/(dashboard)/settings"}
        >
            <Settings class="sidebar-button__icon" />
            <span class="sidebar-button__text">Settings</span>
        </a>
        <button class="sidebar-button" on:click={logout}>
            <Logout class="sidebar-button__icon" />
            <span class="sidebar-button__text">Logout</span>
        </button>
    </div>
</aside>

<style lang="scss">
    .sidebar {
        display: flex;
        flex-flow: column;

        justify-content: space-between;

        background-color: #060606;
        padding: 1rem;
        border-radius: 10px;
    }

    .menu {
        position: relative;

        display: flex;
        flex-flow: column;
        justify-content: space-between;
        align-items: center;
        gap: 0.45rem;

        overflow: hidden;

        cursor: pointer;

        > span {
            width: 24px;
            height: 2px;
            background-color: #999999;
            transition: transform 0.5s cubic-bezier(0.86, 0, 0.07, 1),
                opacity 0.15s ease, background-color 0.25s ease;

            &:nth-child(2) {
                transform: translateX(0px);
                transition: transform 0.25s cubic-bezier(0.86, 0, 0.07, 1),
                    opacity 0.15s ease, background-color 0.25s ease;
                opacity: 1;
            }
        }

        &:hover > span {
            background-color: #ffffff;
        }
    }

    .sidebar__group {
        display: flex;
        flex-flow: column;

        background-color: #101010;
        border-radius: 5px;
        // overflow: hidden;
    }

    .sidebar-button {
        position: relative;
        padding: 1rem;
        color: #bababa;

        background-color: transparent;
        border: none;

        text-align: left;
        text-decoration: none;
        border-radius: 5px;
        white-space: nowrap;
        cursor: pointer;
    }

    .sidebar-button > :global(svg) {
        display: inline;
        width: 24px;
        height: 24px;
        vertical-align: middle;
        fill: white;
    }

    .sidebar-button--selected > :global(svg) {
        color: white;
    }

    .sidebar-button__text {
        background-color: #202020;

        border-radius: 5px;
        font-size: 1rem;
        padding: 0.5rem;
        margin-left: 0.5rem;

        position: absolute;
        top: 50%;
        left: 100%;
        z-index: 1;

        pointer-events: none;

        transition: all 0.25s cubic-bezier(0.785, 0.135, 0.15, 0.86);

        transform: translateX(0px) translateY(-50%);
        opacity: 0;
    }

    .sidebar-button:hover .sidebar-button__text {
        transform: translateX(10px) translateY(-50%);
        opacity: 0.9;
    }

    .sidebar-button--selected {
        background-color: #4e5382;
    }

    .admin-group {
        background: #854747;
        border-radius: 5px;
        padding: 0.15rem;
    }
    .admin-group .sidebar-button {
        padding: 1rem 0.65rem;
    }

    .admin-group__title {
        text-align: center;
        padding: 0.25rem 0;
        display: block;
        font-size: 0.75rem;
    }

    .admin-group__content {
        border-radius: 5px;
    }
</style>
