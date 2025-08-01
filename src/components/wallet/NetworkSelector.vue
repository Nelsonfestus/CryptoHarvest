<template>
  <div class="networks-section">
    <h3>Supported Networks</h3>
    <div class="networks-grid">
      <div
        v-for="network in supportedNetworks"
        :key="network.id"
        :class="['network-card', { active: selectedNetwork.id === network.id }]"
        @click="$emit('select-network', network)"
      >
        <img
          :src="network.icon"
          :alt="network.name"
          class="network-icon"
          @error="handleImageError"
          :title="network.name"
        />
        <div class="network-details">
          <h4>{{ network.name }}</h4>
          <p>{{ network.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NetworkSelector',
  props: {
    supportedNetworks: {
      type: Array,
      required: true,
    },
    selectedNetwork: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleImageError(event) {
      // Fallback to a default icon if the network icon fails to load
      event.target.src =
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDkuNzRMMTIgMTZMMTAuOTEgOS43NEw0IDlMMTAuOTEgOC4yNkwxMiAyWiIgZmlsbD0iI2ZmYTAwMCIvPgo8L3N2Zz4K'
    },
  },
}
</script>

<style scoped>
.networks-section {
  background: var(--bg-dark);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xxl);
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow-lg);
}

.networks-section h3 {
  color: var(--text-white);
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.networks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.network-card {
  background: var(--bg-darker);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: all var(--transition-normal);
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.network-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-orange);
}

.network-card.active {
  border-color: var(--primary-orange);
  background: rgba(235, 103, 9, 0.1);
}

.network-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-sm);
  object-fit: cover;
  flex-shrink: 0;
}

.network-details {
  flex: 1;
}

.network-details h4 {
  color: var(--text-white);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-xs);
  font-weight: 600;
}

.network-details p {
  color: var(--text-muted);
  font-size: var(--font-size-sm);
  margin: 0;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .networks-grid {
    grid-template-columns: 1fr;
  }

  .network-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
