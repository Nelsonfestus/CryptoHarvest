<template>
    <!-- calculate-section -->
    <section class="calculate-section">

        <!-- amount -->
        <div class="amount">
            <label for="amount">Amount</label>
            <input type="text" placeholder="Enter Amount">
        </div>

        <!-- amount -->
        <div class="amount">
            <label for="amount">Investment Plan</label>
            <input type="text" placeholder="Select A Plan">
        </div>

        <!-- calculator -->
        <div class="calculator">
            <img src="../assets/calculator.png" alt="calculator">
        </div>
    </section>
</template>

<script>
export default {
  name: 'Calculate',
}
</script>

<style scoped>
.calculate-section {
    background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
    padding: 30px 40px;
    display: flex;
    justify-content: space-between;
}

.amount,
.calculator {
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: start;
}

input {
    padding: 10px 15px;
}

.calculator {
    align-items: center;
}

.calculator img {
    width: 25%;
}


</style>