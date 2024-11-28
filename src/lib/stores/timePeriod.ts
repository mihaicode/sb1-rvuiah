import { writable } from 'svelte/store';

export type TimePeriod = 'Weekly' | 'Monthly';

export const timePeriod = writable<TimePeriod>('Weekly');