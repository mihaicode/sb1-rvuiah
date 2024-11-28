import { writable, derived } from 'svelte/store';
import { timePeriod } from './timePeriod';

export interface CostItem {
  title: string;
  value: string;
  info: string;
  editable: boolean;
}

const initialCosts = [
  {
    title: 'Raw Materials',
    value: '£1500.00',
    info: 'Total cost for raw materials per batch',
    editable: true
  },
  {
    title: 'Transport Cost',
    value: '£100.00',
    info: 'Transportation costs per batch',
    editable: true
  },
  {
    title: 'Storage Fee',
    value: '£60.00',
    info: 'weekly storage fee',
    editable: true
  },
  {
    title: 'Outside Consultant',
    value: '£50.00',
    info: 'Consultant fee per week',
    editable: true
  }
];

export const UNITS_PER_BATCH = 100;
export const BATCHES_PER_WEEK = 1;
export const WEEKS_PER_MONTH = 4;
export const PROFIT_MARGIN = 0.30; // 30% margin
export const FIXED_SALE_PRICE = 35; // Fixed sale price per unit

export const costsStore = writable<CostItem[]>(initialCosts);

// Calculate total costs based on time period
export const totalCosts = derived([costsStore, timePeriod], ([$costs, $timePeriod]) => {
  const basicCosts = $costs.reduce((sum, cost) => {
    const value = parseFloat(cost.value.replace('£', '')) || 0;
    return sum + value;
  }, 0);

  // For monthly, multiply weekly costs by 4 (except storage which is already monthly)
  if ($timePeriod === 'Monthly') {
    const storageCost = parseFloat($costs.find(c => c.title === 'Storage Cost')?.value.replace('£', '') || '0');
    const otherCosts = basicCosts - storageCost;
    return (otherCosts * WEEKS_PER_MONTH) + storageCost;
  }

  return basicCosts;
});

// Calculate number of units based on time period
export const totalUnits = derived(timePeriod, ($timePeriod) => {
  const unitsPerWeek = UNITS_PER_BATCH * BATCHES_PER_WEEK;
  return $timePeriod === 'Monthly' ? unitsPerWeek * WEEKS_PER_MONTH : unitsPerWeek;
});

// Calculate costs per unit
export const costPerUnit = derived([totalCosts, totalUnits], ([$totalCosts, $totalUnits]) => {
  return $totalCosts / $totalUnits;
});

// Calculate recommended price per unit with margin
export const recommendedPricePerUnit = derived(costPerUnit, ($costPerUnit) => {
  return $costPerUnit * (1 + PROFIT_MARGIN);
});

// Calculate potential profit per unit
export const profitPerUnit = derived(costPerUnit, ($costPerUnit) => {
  return FIXED_SALE_PRICE - $costPerUnit;
});

// Calculate total profit per time period
export const totalProfit = derived([profitPerUnit, totalUnits], ([$profitPerUnit, $totalUnits]) => {
  return $profitPerUnit * $totalUnits;
});