<script lang="ts">
  import ExchangeLoginCodeForm from "$lib/components/auth/ExchangeLoginCodeForm.svelte";
</script>

<main class="background">
  <div class="card">
    <ExchangeLoginCodeForm />
  </div>
</main>

<style lang="scss">
  .background {
    width: 100%;
    height: 100vh;

    display: flex;
    flex-flow: column;

    justify-content: center;
    align-items: center;

    background:
      linear-gradient(
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.9),
        rgba(0, 0, 0, 0.7)
      ),
      url("/assets/login-background.webp") center no-repeat;
    background-size: cover;
  }

  .card {
    width: 100%;
    max-width: 450px;
  }
</style>
