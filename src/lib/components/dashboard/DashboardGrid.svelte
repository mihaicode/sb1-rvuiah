<script lang="ts">
  import StatCard from './StatCard.svelte';
  import { 
    costsStore, 
    totalCosts, 
    costPerUnit,
    recommendedPricePerUnit,
    totalUnits,
    FIXED_SALE_PRICE,
    profitPerUnit,
    totalProfit
  } from '$lib/stores/costs';
  import { timePeriod } from '$lib/stores/timePeriod';
  import { formatCurrency } from '$lib/utils/formatters';

  function handleValueChange(event: CustomEvent) {
    const { title, value } = event.detail;
    costsStore.update(costs => 
      costs.map(cost => 
        cost.title === title ? { ...cost, value } : cost
      )
    );
  }

  $: summaryStats = [
    {
      title: 'Total Cost',
      value: formatCurrency($totalCosts),
      info: `Total production cost for ${$totalUnits} units (${$timePeriod})`,
      editable: false
    },
    {
      title: 'Cost Per Unit',
      value: formatCurrency($costPerUnit),
      info: `Production cost divided by number of units (${$timePeriod})`,
      editable: false
    },
    {
      title: 'Average Sale Price',
      value: formatCurrency(FIXED_SALE_PRICE),
      info: `Fixed sale price per unit (${$timePeriod})`,
      editable: false
    },
    {
      title: 'Profit Per Unit',
      value: formatCurrency($profitPerUnit),
      info: `Profit margin per unit sold (${$timePeriod})`,
      editable: false
    },
    {
      title: 'Total Profit',
      value: formatCurrency($totalProfit),
      info: `Total profit for ${$totalUnits} units (${$timePeriod})`,
      editable: false
    }
  ];
</script>

<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
  {#each $costsStore as stat}
    <StatCard 
      {...stat} 
      on:valueChange={handleValueChange}
    />
  {/each}
  
  {#each summaryStats as stat}
    <StatCard {...stat} />
  {/each}
</div>