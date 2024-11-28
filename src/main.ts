import './app.css';
import App from './App.svelte';
import { initializeSentry } from './lib/config/sentry';

if (import.meta.env.PROD) {
  initializeSentry();
}

const app = new App({
  target: document.getElementById('app')!,
});

export default app;