<script lang="ts">
    import { isAdmin, player } from "$lib/api/api";
    import type { Game } from "$lib/api/games";
    import { getData, type BannerData } from "$lib/data/games";

    export let game: Game;

    let bannerData: BannerData[] = getData(game.attributes);

    $: {
        bannerData = getData(game.attributes);
    }
</script>

<div class="card game">
    <div class="banners">
        {#each bannerData as banner}
            <div class="banner">
                <img
                    class="banner__img"
                    src={`/assets/banners/${banner.image}.webp`}
                    alt={banner.name}
                />
                <div class="banner__text">
                    <h2 class="banner__text__name">{banner.name}</h2>
                    {#if banner.location}
                        <p class="banner__text__loc">{banner.location}</p>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
    <div class="players">
        {#each game.players as gp, i}
            <div class="player">
                <h4>
                    {gp.display_name}

                    {#if i == 0}
                        <span class="host">Host</span>
                    {/if}
                </h4>
                {#if isAdmin($player) && gp.net && gp.net.groups}
                    <div class="net-groups">
                        <div class="net-group">
                            <h5 class="net-group__title">Internal</h5>
                            <p class="net-group__value">
                                {gp.net.groups.internal.address}:{gp.net.groups
                                    .internal.port}
                            </p>
                        </div>
                        <div class="net-group">
                            <h5 class="net-group__title">External</h5>
                            <p class="net-group__value">
                                {gp.net.groups.external.address}:{gp.net.groups
                                    .external.port}
                            </p>
                        </div>
                        <div class="net-group">
                            <h5 class="net-group__title">Natt Type</h5>
                            <p class="net-group__value">{gp.net.qos.natt}</p>
                        </div>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .game {
        flex: auto;
        display: flex;
        flex-flow: row wrap;
        gap: 1rem;
    }

    .host {
        background-color: #4e5382;
        padding: 0.5rem 1rem;
        font-size: 0.75rem;
        margin-left: 1rem;
        border-radius: 30px;
    }

    .net-groups {
        display: flex;
        flex-flow: column;
        margin-top: 1rem;
    }

    .net-group {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .net-group__title {
        font-size: 0.75rem;
    }

    .net-group__value {
        color: black;
        background-color: black;
        font-size: 0.75rem;
        padding: 0 0.5rem;
    }

    .net-group:active .net-group__value {
        color: #999999;
    }

    .players {
        display: flex;
        flex-flow: column;
        gap: 1rem;
        flex: auto;
    }

    .player {
        padding: 1rem;
        border-radius: 5px;
        background-color: #272727;
        flex: auto;
    }

    .banner {
        display: block;
        position: relative;
        width: 100%;
        max-width: 400px;
        max-width: 400px;
    }

    .banner__img {
        width: 100%;
    }

    .banner__text {
        display: flex;
        flex-flow: row;
        gap: 1rem;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 0.5rem;
        background-color: rgba(0, 0, 0, 0.75);
    }

    .banner__text__name {
        font-size: 1rem;
    }

    .banner__text__loc {
        font-size: 1rem;
        color: #999;
    }
</style>
