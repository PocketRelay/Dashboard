<script lang="ts">
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import "$lib/styles/global.scss";
  import "@fontsource/inter";

  const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
  <slot />
</QueryClientProvider>
