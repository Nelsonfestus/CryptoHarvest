<template>
  <div v-if="isWalletConnected" class="transactions-section">
    <h3>Transaction History</h3>
    <div class="transactions-list">
      <div v-for="tx in transactions" :key="tx.id" class="transaction-item" :class="tx.status">
        <div class="tx-info">
          <div class="tx-type">{{ tx.type }}</div>
          <div class="tx-amount">{{ tx.amount }} {{ tx.network }}</div>
          <div class="tx-date">{{ formatDate(tx.date) }}</div>
        </div>
        <div class="tx-status">
          <span :class="['status-badge', tx.status]">{{ tx.status }}</span>
        </div>
      </div>

      <div v-if="transactions.length === 0" class="no-transactions">
        <p>No transactions found</p>
        <p class="sub-text">Your transaction history will appear here once you make payments</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionHistory',
  props: {
    isWalletConnected: {
      type: Boolean,
      default: false,
    },
    transactions: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    formatDate(date) {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(date))
    },
  },
}
</script>

<style scoped>
.transactions-section {
  background: var(--bg-dark);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xxl);
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow-lg);
}

.transactions-section h3 {
  color: var(--text-white);
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.transactions-list {
  max-height: 400px;
  overflow-y: auto;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-darker);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
  border-left: 4px solid #333;
  transition: all var(--transition-normal);
}

.transaction-item:hover {
  transform: translateX(4px);
  box-shadow: var(--shadow-md);
}

.transaction-item.completed {
  border-left-color: #4caf50;
}

.transaction-item.pending {
  border-left-color: #ff9800;
}

.transaction-item.failed {
  border-left-color: #f44336;
}

.tx-info {
  flex: 1;
}

.tx-type {
  color: var(--text-white);
  font-weight: 600;
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-xs);
}

.tx-amount {
  color: var(--text-gold);
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-xs);
}

.tx-date {
  color: var(--text-muted);
  font-size: var(--font-size-sm);
}

.tx-status {
  margin-left: var(--spacing-lg);
}

.status-badge {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.completed {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
  border: 1px solid #4caf50;
}

.status-badge.pending {
  background: rgba(255, 152, 0, 0.2);
  color: #ff9800;
  border: 1px solid #ff9800;
}

.status-badge.failed {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
  border: 1px solid #f44336;
}

.no-transactions {
  text-align: center;
  padding: var(--spacing-xxl);
  color: var(--text-muted);
}

.no-transactions p {
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-lg);
}

.no-transactions .sub-text {
  font-size: var(--font-size-sm);
  opacity: 0.7;
}

/* Scrollbar styling */
.transactions-list::-webkit-scrollbar {
  width: 6px;
}

.transactions-list::-webkit-scrollbar-track {
  background: var(--bg-darker);
  border-radius: var(--radius-sm);
}

.transactions-list::-webkit-scrollbar-thumb {
  background: var(--primary-orange);
  border-radius: var(--radius-sm);
}

.transactions-list::-webkit-scrollbar-thumb:hover {
  background: var(--primary-red);
}

@media (max-width: 768px) {
  .transaction-item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-md);
  }

  .tx-status {
    margin-left: 0;
    align-self: flex-end;
  }
}
</style>
