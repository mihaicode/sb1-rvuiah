import { writable } from 'svelte/store';

type Theme = 'light' | 'dark' | 'system';

function createThemeStore() {
  const { subscribe, set, update } = writable<Theme>('system');

  return {
    subscribe,
    set: (theme: Theme) => {
      set(theme);
      if (theme !== 'system') {
        document.documentElement.classList.toggle('dark', theme === 'dark');
      }
    },
    toggle: () => {
      update(current => {
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.classList.toggle('dark', next === 'dark');
        return next;
      });
    }
  };
}

export const theme = createThemeStore();