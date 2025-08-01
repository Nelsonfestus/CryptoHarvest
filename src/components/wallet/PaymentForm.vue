<template>
  <div v-if="isWalletConnected" class="payment-section">
    <h3>Make Investment Payment</h3>

    <div class="investment-form">
      <div class="form-group">
        <label>Select Investment Plan</label>
        <select
          :value="selectedPlan"
          @change="$emit('update:selectedPlan', $event.target.value)"
          class="plan-select"
        >
          <option value="">Choose a plan</option>
          <option v-for="plan in investmentPlans" :key="plan.id" :value="plan">
            {{ plan.name }} - Min: ${{ plan.minAmount }} | ROI: {{ plan.roi }}%
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Investment Amount ({{ selectedNetwork.symbol }})</label>
        <input
          :value="investmentAmount"
          @input="$emit('update:investmentAmount', $event.target.value)"
          type="number"
          :placeholder="`Enter amount in ${selectedNetwork.symbol}`"
          :min="selectedPlan ? selectedPlan.minAmount : 0"
          class="amount-input"
        />
        <div class="amount-info">
          <span>Min: ${{ selectedPlan ? selectedPlan.minAmount : 0 }}</span>
          <span>Max: ${{ selectedPlan ? selectedPlan.maxAmount : 'Unlimited' }}</span>
        </div>
      </div>

      <div class="payment-summary">
        <h4>Payment Summary</h4>
        <div class="summary-item">
          <span>Investment Amount:</span>
          <span>${{ investmentAmount || 0 }}</span>
        </div>
        <div class="summary-item">
          <span>Network Fee:</span>
          <span>{{ networkFee }} {{ selectedNetwork.symbol }}</span>
        </div>
        <div class="summary-item total">
          <span>Total to Pay:</span>
          <span>{{ totalToPay }} {{ selectedNetwork.symbol }}</span>
        </div>
      </div>

      <button @click="$emit('process-payment')" class="pay-btn" :disabled="!canProcessPayment">
        <span v-if="!processing">Pay {{ totalToPay }} {{ selectedNetwork.symbol }}</span>
        <span v-else>Processing Payment...</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentForm',
  props: {
    isWalletConnected: {
      type: Boolean,
      default: false,
    },
    selectedNetwork: {
      type: Object,
      required: true,
    },
    investmentPlans: {
      type: Array,
      required: true,
    },
    selectedPlan: {
      type: Object,
      default: null,
    },
    investmentAmount: {
      type: [String, Number],
      default: '',
    },
    networkFee: {
      type: Number,
      default: 0,
    },
    totalToPay: {
      type: Number,
      default: 0,
    },
    canProcessPayment: {
      type: Boolean,
      default: false,
    },
    processing: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:selectedPlan', 'update:investmentAmount', 'process-payment'],
}
</script>

<style scoped>
.payment-section {
  background: var(--bg-dark);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xxl);
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow-lg);
}

.payment-section h3 {
  color: var(--text-white);
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.investment-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-group label {
  display: block;
  color: var(--text-gold);
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
}

.plan-select,
.amount-input {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  border: none;
  background: var(--bg-darker);
  color: var(--text-white);
  font-size: var(--font-size-base);
  outline: none;
}

.plan-select:focus,
.amount-input:focus {
  border: 1.5px solid var(--primary-orange);
}

.amount-info {
  display: flex;
  justify-content: space-between;
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--text-muted);
}

.payment-summary {
  background: var(--bg-darker);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.payment-summary h4 {
  color: var(--text-gold);
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid #333;
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-item.total {
  font-weight: 700;
  font-size: var(--font-size-lg);
  color: var(--text-gold);
  border-top: 2px solid var(--primary-orange);
  border-bottom: none;
  padding-top: var(--spacing-md);
  margin-top: var(--spacing-md);
}

.pay-btn {
  width: 100%;
  background: var(--primary-gradient);
  color: var(--text-white);
  border: none;
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  font-size: var(--font-size-lg);
  font-weight: 700;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.pay-btn:hover:not(:disabled) {
  background: var(--text-white);
  color: var(--primary-orange);
  transform: translateY(-2px);
}

.pay-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 768px) {
  .payment-section {
    padding: var(--spacing-lg);
  }

  .amount-info {
    flex-direction: column;
    gap: var(--spacing-xs);
  }
}
</style>
