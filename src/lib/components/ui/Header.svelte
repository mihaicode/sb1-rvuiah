<script lang="ts">
  import { Sun, Moon } from 'lucide-svelte';
  import { theme } from '$lib/stores/theme';
  import TimeSelector from './TimeSelector.svelte';
</script>

<header class="border-b">
  <div class="container flex h-16 items-center justify-between">
    <div class="flex items-center gap-4">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <TimeSelector />
    </div>
    <button
      class="rounded-md p-2 hover:bg-accent"
      on:click={() => theme.toggle()}
    >
      {#if $theme === 'dark'}
        <Sun class="h-5 w-5" />
      {:else}
        <Moon class="h-5 w-5" />
      {/if}
    </button>
  </div>
</header>