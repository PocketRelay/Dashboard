<script lang="ts">
    export let credits: number;

    $: {
        if (credits < 0) credits = 0;
    }
</script>

<div class="card">
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
</div>
