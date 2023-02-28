<script lang="ts">
    export let credits: number;
</script>

<form class=" card">
    <label class="input">
        <span class="input__label">Credits</span>
        <input
            class="input__value"
            type="number"
            bind:value={credits}
            required
            min={0}
        />
    </label>
</form>

<style lang="scss">
</style>
