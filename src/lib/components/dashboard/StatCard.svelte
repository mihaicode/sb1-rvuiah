<script lang="ts">
  import EditableValue from './EditableValue.svelte';
  import { createEventDispatcher } from 'svelte';
  import { Pencil, Lock } from 'lucide-svelte';

  export let title: string;
  export let value: string;
  export let info: string;
  export let editable: boolean = true;

  const dispatch = createEventDispatcher();

  function handleValueChange(event: CustomEvent) {
    dispatch('valueChange', {
      title,
      value: event.detail.value
    });
  }
</script>

<div class="rounded-lg border bg-card p-4 text-card-foreground relative group h-full {!editable ? 'bg-muted' : ''}">
  <div class="flex items-center justify-between mb-2">
    <h2 class="font-semibold">{title}</h2>
    {#if editable}
      <Pencil class="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    {:else}
      <Lock class="w-4 h-4 text-muted-foreground" />
    {/if}
  </div>
  
  <EditableValue 
    {value} 
    {editable} 
    on:change={handleValueChange} 
  />
  
  <p class="text-xs text-muted-foreground mt-2">{info}</p>
  
  {#if editable}
    <div class="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-lg transition-colors pointer-events-none" />
  {/if}
</div>