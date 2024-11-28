<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { parseCurrencyValue, formatCurrency } from '$lib/utils/formatters';
  
  export let value: string;
  export let editable: boolean = true;
  
  const dispatch = createEventDispatcher();
  let isEditing = false;
  let inputValue = parseCurrencyValue(value).toString();

  $: {
    if (!isEditing) {
      inputValue = parseCurrencyValue(value).toString();
    }
  }
  
  function startEditing() {
    if (!editable) return;
    isEditing = true;
    // Set focus on next tick after input is rendered
    setTimeout(() => {
      const input = document.querySelector('input');
      if (input) input.focus();
    }, 0);
  }
  
  function handleBlur() {
    isEditing = false;
    const numericValue = parseFloat(inputValue) || 0;
    const newValue = formatCurrency(numericValue);
    if (newValue !== value) {
      dispatch('change', { value: newValue });
    }
  }
  
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      (event.target as HTMLInputElement).blur();
    }
    if (event.key === 'Escape') {
      isEditing = false;
      inputValue = parseCurrencyValue(value).toString();
    }
  }
</script>

{#if isEditing}
  <input
    type="number"
    bind:value={inputValue}
    on:blur={handleBlur}
    on:keydown={handleKeyDown}
    class="w-full bg-transparent text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2"
    step="0.01"
    min="0"
    autocomplete="off"
  />
{:else}
  <button 
    class="text-2xl font-bold w-full text-left {editable ? 'cursor-pointer hover:text-primary transition-colors' : 'cursor-default'}" 
    on:click={startEditing}
    disabled={!editable}
  >
    {value}
  </button>
{/if}