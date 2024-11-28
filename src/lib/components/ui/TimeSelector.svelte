<script lang="ts">
  import { timePeriod, type TimePeriod } from '$lib/stores/timePeriod';
  
  const periods: TimePeriod[] = ['Weekly', 'Monthly'];
</script>

<select
  bind:value={$timePeriod}
  class="bg-background text-foreground border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
>
  {#each periods as period}
    <option value={period}>{period}</option>
  {/each}
</select>