<template>
    <div class="board-wrapper">
        <component :is="component" v-if="component" :controller="controller" />
    </div>
</template>

<script>

export default {
    props: [
        "controller"
    ],
    data() {
        return {
            component: null
        }
    },
    mounted() {
        this.component = this.controller.component
        console.log(this.controller)
    },
}
</script>
