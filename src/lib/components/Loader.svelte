<div class="loader-wrapper">
    <div class="loader" />
    <p class="loader-text">Loading...</p>
</div>

<style lang="scss">
    .loader-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        z-index: 1;

        background: rgba(0, 0, 0, 0.7);

        display: flex;
        flex-flow: column;
        gap: 1rem;
        align-items: center;
        justify-content: center;
    }

    .loader {
        width: 32px;
        height: 32px;
        border: 5px solid #ffffff;
        border-radius: 100%;
        border-top-color: transparent;

        animation: loader 1s linear infinite;
    }

    @keyframes loader {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
