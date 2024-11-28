<script lang="ts">
  import './app.css';
  import Header from '$lib/components/ui/Header.svelte';
  import DashboardGrid from '$lib/components/dashboard/DashboardGrid.svelte';
</script>

<div class="min-h-screen bg-background">
  <Header />
  <main class="container py-6">
    <DashboardGrid />
  </main>
</div>