<script lang="ts">
    export let title: string;
    export let text: string | undefined = undefined;
</script>

<div class="wrapper">
    <div class="heading">
        <h1 class="title">{title}</h1>
        <span class="ident">POCKET RELAY MANAGER</span>
        {#if text}
            <p class="text">{text}</p>
        {/if}

        <slot name="heading" />
    </div>

    <main class="content">
        <slot />
    </main>
</div>

<style lang="scss">
    .content {
        height: 100%;
        overflow: auto;
    }

    .wrapper {
        display: flex;
        flex-flow: column;
        gap: 1rem;
        height: 100%;
    }

    .title,
    .ident,
    .text {
        margin-bottom: 0.5rem;
    }

    .text {
        color: #999999;
    }
</style>
