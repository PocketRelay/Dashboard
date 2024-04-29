<script lang="ts">
  import Home from "~icons/ph/house-line-fill";
  import Settings from "~icons/ph/gear-fill";
  import List from "~icons/ph/list-numbers-bold";
  import Inventory from "~icons/ph/backpack-fill";
  import AccountMultiple from "~icons/ph/users-three-fill";
  import Classes from "~icons/ph/users-four-fill";
  import Games from "~icons/ph/game-controller-fill";
  import Logs from "~icons/ph/terminal-fill";
  import Logout from "~icons/ph/sign-out-bold";

  import { clearToken, player } from "$lib/api/api";
  import { PlayerRole } from "$lib/api/players";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";

  async function logout() {
    clearToken();
    await goto(`${base}/login`);
  }
</script>

<aside class="sidebar">
  <nav class="sidebar__group">
    <a
      class="sidebar-button"
      href="{base}/"
      class:sidebar-button--selected={$page.route.id == "/(dashboard)"}
    >
      <Home class="sidebar-button__icon" />
      <span class="sidebar-button__text">Home</span>
    </a>
    <a
      class="sidebar-button"
      href="{base}/leaderboard"
      class:sidebar-button--selected={$page.route.id ==
        "/(dashboard)/leaderboard"}
    >
      <List class="sidebar-button__icon" />
      <span class="sidebar-button__text">Leaderboard</span>
    </a>
    <a
      class="sidebar-button"
      href="{base}/inventory"
      class:sidebar-button--selected={$page.route.id ==
        "/(dashboard)/inventory"}
    >
      <Inventory class="sidebar-button__icon" />
      <span class="sidebar-button__text">Inventory</span>
    </a>
    <a
      class="sidebar-button"
      href="{base}/inventory_v2"
      class:sidebar-button--selected={$page.route.id ==
        "/(dashboard)/inventory_v2"}
    >
      <Inventory class="sidebar-button__icon" />
      <span class="sidebar-button__text">Inventory V2</span>
    </a>
    <a
      class="sidebar-button"
      href="{base}/classes"
      class:sidebar-button--selected={$page.route.id == "/(dashboard)/classes"}
    >
      <Classes class="sidebar-button__icon" />
      <span class="sidebar-button__text">Classes</span>
    </a>
    <a
      class="sidebar-button"
      href="{base}/games"
      class:sidebar-button--selected={$page.route.id == "/(dashboard)/games"}
    >
      <Games class="sidebar-button__icon" />
      <span class="sidebar-button__text">Games</span>
    </a>

    {#if $player.role == PlayerRole.Admin || $player.role == PlayerRole.SuperAdmin}
      <a
        class="sidebar-button"
        href="{base}/players"
        class:sidebar-button--selected={$page.route.id ==
          "/(dashboard)/(admin)/players"}
      >
        <AccountMultiple class="sidebar-button__icon" />
        <span class="sidebar-button__text">Players</span>
      </a>
    {/if}
  </nav>

  <div class="sidebar__group">
    {#if $player.role == PlayerRole.SuperAdmin}
      <a
        class="sidebar-button"
        href="{base}/logs"
        class:sidebar-button--selected={$page.route.id ==
          "/(dashboard)/(admin)/logs"}
      >
        <Logs class="sidebar-button__icon" />
        <span class="sidebar-button__text">Logs</span>
      </a>
    {/if}
    <a
      class="sidebar-button"
      href="{base}/settings"
      class:sidebar-button--selected={$page.route.id == "/(dashboard)/settings"}
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

    &__group {
      display: flex;
      flex-flow: column;

      background-color: #101010;
      border-radius: 5px;
    }
  }

  .sidebar-button {
    position: relative;
    padding: 1rem;
    color: #bababa;

    background-color: #101010;
    border: none;

    text-align: left;
    text-decoration: none;
    border-radius: 5px;
    white-space: nowrap;
    cursor: pointer;

    &__text {
      background-color: #202020;
      border-radius: 5px;
      font-size: 1rem;
      padding: 0.5rem;
      margin-left: 0.5rem;

      position: absolute;
      top: 50%;
      left: 100%;
      z-index: 2;

      pointer-events: none;

      transition: all 0.25s cubic-bezier(0.785, 0.135, 0.15, 0.86);

      transform: translateX(0px) translateY(-50%);
      opacity: 0;
    }

    &:hover {
      background-color: #1f1f1f;

      .sidebar-button__text {
        transform: translateX(10px) translateY(-50%);
        opacity: 0.9;
      }
    }

    > :global(svg) {
      display: inline;
      width: 24px;
      height: 24px;
      vertical-align: middle;
      fill: white;
    }

    &--selected {
      background-color: #4e5382;

      > :global(svg) {
        color: white;
      }

      &:hover {
        background-color: #676b96;
      }
    }
  }
</style>
