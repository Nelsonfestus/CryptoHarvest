<template>
    <div class="container">
        <div class="Questions_header_section">
            <div class="Question_title">
                <h1>Frequently Asked Questions</h1>
            </div>
        </div>
        <Accordion />
    </div>

</template>

<script>
import Accordion from '@/components/Accordion.vue'

export default {
    name: 'Questions',
    components: {
        Accordion
    },

}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

.container {
    background-color: #151515;
    height: 80vh;
}

.Questions_header_section {
    display: flex;
    justify-content: center;
    padding-top: 2.3cm;
    padding-bottom: 2.3cm;
}

.Question_title h1 {
    width: 99%;
    font-weight: 800;
    font-size: 420%;
    background: linear-gradient(45deg, #f83201, #ffa600);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
}

@media screen and (max-width: 1200px) {
    * {
        padding: 0;
        margin: 0;
    }

    .Question_title h1 {
        font-size: clamp(20px, 4vh, 25px);
        line-height: 31.2px;
        font-weight: 600;
        width: 100%;
    }

    .Questions_header_section {
        display: flex;
        justify-content: center;
        padding-top: 2cm;
        padding-bottom: 1cm;
    }
}
</style>