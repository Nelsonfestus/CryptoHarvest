<template>
    <div class="accordion">
        <div class="accordion-item">
            <input type="radio" id="section1" name="accordion" />
            <label for="section1" class="accordion-header">
                <span class="accordion-title">Does this software generate online money</span>
                <div class="accordion-icon">
                    <i class="bi bi-plus plus-icon"></i>
                    <i class="bi bi-dash minus-icon"></i>
                </div>
            </label>
            <div class="content">
                <p>Our platform is not a money-generating tool but a secure investment platform designed to help you grow your wealth through strategic financial plans. By choosing a plan and investing, you can earn profits based on your chosen strategy and the performance of your investments. Success depends on smart decisions and the opportunities we provide for your financial growth</p>
            </div>
        </div>

        <div class="accordion-item">
            <input type="radio" id="section2" name="accordion" />
            <label for="section2" class="accordion-header">
                <span class="accordion-title">Is there any signup Bonus system?</span>
                <div class="accordion-icon">
                    <i class="bi bi-plus plus-icon"></i>
                    <i class="bi bi-dash minus-icon"></i>
                </div>
            </label>
            <div class="content">
                <p>Yes, we offer a signup bonus as a warm welcome to our new users! Once you create an account and meet the eligibility criteria, the bonus will be credited to your account. It's our way of helping you kickstart your investment journey with extra value. Terms and conditions apply—check out our promotions page for more details.</p>
            </div>
        </div>

        <div class="accordion-item">
            <input type="radio" id="section3" name="accordion" />
            <label for="section3" class="accordion-header">
                <span class="accordion-title">How Do I Check My Account Balance?</span>
                <div class="accordion-icon">
                    <i class="bi bi-plus plus-icon"></i>
                    <i class="bi bi-dash minus-icon"></i>
                </div>
            </label>
            <div class="content">
                <p>Log in to Your Account: Use your registered email and password to access your dashboard. Go to the Balance Section: Navigate to the "Account Balance" or "Dashboard" section. View Real-Time Updates: Your current balance, transaction history, and earnings are displayed in real time for your convenience.</p>
            </div>
        </div>

        <div class="accordion-item">
            <input type="radio" id="section4" name="accordion" />
            <label for="section4" class="accordion-header">
                <span class="accordion-title">How Many Payment Gateways Are Used in this site</span>
                <div class="accordion-icon">
                    <i class="bi bi-plus plus-icon"></i>
                    <i class="bi bi-dash minus-icon"></i>
                </div>
            </label>
            <div class="content">
                <p>We offer multiple secure</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.accordion {
    width: 30cm;
    margin: 0 auto;
}

.accordion-item {
    margin-bottom: 5px;
}

.accordion-item .content {
    font-size: 12px;
}

.accordion input[type="radio"] {
    display: none;
}

.accordion .content {
    height: 0px;
    padding: 0px;
    background-color: inherit;
    border-top: 2px solid #cccccc0e;
    overflow: hidden;
    transition: all 0.9s ease;
    color: white;
}

.accordion .content p {
    width: 100%;
    font-size: 150%;
    margin: 0;
    line-height: 1.5;
}

.accordion-icon i {
    font-size: 150%;
    font-weight: 800;
}

.accordion input[type="radio"]:checked + .accordion-header + .content {
    height: auto;
    padding: 15px;
}

.accordion-icon {
    display: flex;
    align-items: center;
    position: relative;
}

/* Default state: show plus, hide minus */
.plus-icon {
    display: block;
}

.minus-icon {
    display: none;
}

/* When checked: hide plus, show minus */
.accordion input[type="radio"]:checked + .accordion-header .plus-icon {
    display: none;
}

.accordion input[type="radio"]:checked + .accordion-header .minus-icon {
    display: block;
   
}

.accordion-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    background-color: inherit;
    color: white;
    cursor: pointer;
    font-weight: bold;
    text-align: left;
}

.accordion-header .accordion-title {
    font-size: 24px;
    line-height: 31.2px;
    font-weight: 600;
}
@media screen and (max-width: 1200px){
    *{
        padding: 0;
        margin: 0;
    }

    .accordion {
    width: fit-content;
    margin: 0 auto;
    margin: 0px 13px;
}

.accordion-header .accordion-title{
    font-size: clamp(10px, 2vh, 15px);
    line-height: 31.2px;
    font-weight: 600;
}

.accordion .content p {
    width: 100%;
    font-size: clamp(10px, 2vh, 14px);
    margin: 0;
    line-height: 1.5;
}
}
</style>