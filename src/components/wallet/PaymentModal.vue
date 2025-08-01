<template>
  <div v-if="show" class="modal-overlay" @click="$emit('close')">
    <div class="payment-modal" @click.stop>
      <h3>Confirm Payment</h3>
      <div class="payment-details">
        <p><strong>Amount:</strong> {{ investmentAmount }} {{ selectedNetwork.symbol }}</p>
        <p><strong>Network:</strong> {{ selectedNetwork.name }}</p>
        <p><strong>Plan:</strong> {{ selectedPlan.name }}</p>
        <p><strong>Fee:</strong> {{ networkFee }} {{ selectedNetwork.symbol }}</p>
        <p><strong>Total:</strong> {{ totalToPay }} {{ selectedNetwork.symbol }}</p>
      </div>
      <div class="modal-actions">
        <button @click="$emit('close')" class="cancel-btn">Cancel</button>
        <button @click="$emit('confirm')" class="confirm-btn">Confirm Payment</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    investmentAmount: {
      type: [String, Number],
      default: 0,
    },
    selectedNetwork: {
      type: Object,
      required: true,
    },
    selectedPlan: {
      type: Object,
      required: true,
    },
    networkFee: {
      type: Number,
      default: 0,
    },
    totalToPay: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.payment-modal {
  background: var(--bg-dark);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xxl);
  max-width: 500px;
  width: 90%;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--primary-orange);
}

.payment-modal h3 {
  color: var(--text-white);
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.payment-details {
  background: var(--bg-darker);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.payment-details p {
  color: var(--text-white);
  margin-bottom: var(--spacing-sm);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.payment-details p:last-child {
  margin-bottom: 0;
  border-top: 1px solid #333;
  padding-top: var(--spacing-sm);
  font-weight: 700;
  color: var(--text-gold);
}

.payment-details strong {
  color: var(--text-gold);
}

.modal-actions {
  display: flex;
  gap: var(--spacing-md);
}

.cancel-btn,
.confirm-btn {
  flex: 1;
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  border: none;
}

.cancel-btn {
  background: transparent;
  color: var(--text-white);
  border: 2px solid #666;
}

.cancel-btn:hover {
  background: #666;
  color: var(--text-white);
}

.confirm-btn {
  background: var(--primary-gradient);
  color: var(--text-white);
}

.confirm-btn:hover {
  background: var(--text-white);
  color: var(--primary-orange);
}

@media (max-width: 768px) {
  .payment-modal {
    padding: var(--spacing-lg);
    margin: var(--spacing-lg);
  }

  .modal-actions {
    flex-direction: column;
  }

  .payment-details p {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }
}
</style>
